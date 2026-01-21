import { z } from "zod";
import { eq, and, gte, lte, sql, inArray } from "drizzle-orm";
import { getDb } from "./db";
import { 
  vendasExternas, 
  itensVendaExterna, 
  mapaProdutos, 
  fichasTecnicas,
  perdas,
  insumos,
  contagensEstoque,
  entradasEstoque // <--- Nova tabela
} from "../drizzle/schema";
import { publicProcedure, router } from "./_core/trpc";

export const analiseEstoqueRouter = router({
  gerarRelatorio: publicProcedure
    .input(z.object({
      dataInicio: z.string(),
      dataFim: z.string(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const inicio = new Date(input.dataInicio);
      inicio.setHours(0, 0, 0, 0);
      const fim = new Date(input.dataFim);
      fim.setHours(23, 59, 59, 999);

      // 1. Estrutura de Dados
      const analise: Record<number, {
        id: number,
        nome: string,
        unidade: string,
        consumoTeorico: number, // Vendas
        perdaDeclarada: number, // Desperdício
        compras: number,        // Entradas Oficiais
        ajustesContagem: number,// Diferença de Inventário
        estoqueInicial: number | null,
        estoqueFinal: number | null,
        custoUnitario: number
      }> = {};

      const todosInsumos = await db.select().from(insumos).where(eq(insumos.ativo, true));
      for (const ins of todosInsumos) {
        analise[ins.id] = {
          id: ins.id,
          nome: ins.nome,
          unidade: ins.unidade,
          consumoTeorico: 0,
          perdaDeclarada: 0,
          compras: 0,
          ajustesContagem: 0,
          estoqueInicial: null,
          estoqueFinal: null,
          custoUnitario: parseFloat(ins.custoUnitario)
        };
      }

      // 2. Vendas (Consumo Teórico)
      const vendas = await db.select({ id: vendasExternas.id })
        .from(vendasExternas)
        .where(and(
          gte(vendasExternas.dataVenda, inicio),
          lte(vendasExternas.dataVenda, fim),
          eq(vendasExternas.status, 'concluido')
        ));
      
      const vendasIds = vendas.map(v => v.id);

      if (vendasIds.length > 0) {
        const itensVendidos = await db.select({
          qtdVendida: itensVendaExterna.quantidade,
          componentes: fichasTecnicas.componentes
        })
        .from(itensVendaExterna)
        .innerJoin(mapaProdutos, eq(itensVendaExterna.externalProdutoId, mapaProdutos.externalProdutoId))
        .innerJoin(fichasTecnicas, eq(mapaProdutos.fichaTecnicaId, fichasTecnicas.id))
        .where(inArray(itensVendaExterna.vendaId, vendasIds));

        for (const item of itensVendidos) {
          const qtdVenda = parseFloat(item.qtdVendida);
          const componentes = item.componentes as any[];
          if (componentes && Array.isArray(componentes)) {
            for (const comp of componentes) {
              const insumoId = parseInt(comp.insumoId);
              if (analise[insumoId]) {
                analise[insumoId].consumoTeorico += (parseFloat(comp.quantidade) * qtdVenda);
              }
            }
          }
        }
      }

      // 3. Compras (Entradas Oficiais)
      const entradas = await db.select()
        .from(entradasEstoque)
        .where(and(gte(entradasEstoque.dataEntrada, inicio), lte(entradasEstoque.dataEntrada, fim)));

      for (const ent of entradas) {
        if (analise[ent.insumoId]) {
          analise[ent.insumoId].compras += parseFloat(ent.quantidade);
        }
      }

      // 4. Perdas
      const perdasList = await db.select()
        .from(perdas)
        .where(and(gte(perdas.createdAt, inicio), lte(perdas.createdAt, fim)));

      for (const p of perdasList) {
        if (analise[p.insumoId]) {
          analise[p.insumoId].perdaDeclarada += parseFloat(p.quantidade);
        }
      }

      // 5. Contagens (Estoque Inicial e Final do período)
      // Lógica simplificada: Pega a primeira contagem do período como "Inicial" e a última como "Final"
      // Se não houver no período, tenta pegar a última contagem ANTES do período.
      
      for (const insumoIdStr in analise) {
        const insumoId = parseInt(insumoIdStr);
        
        // Contagens dentro do período ordenadas por data
        const contagensInsumo = await db.select()
          .from(contagensEstoque)
          .where(and(
            eq(contagensEstoque.insumoId, insumoId),
            gte(contagensEstoque.createdAt, inicio),
            lte(contagensEstoque.createdAt, fim)
          ))
          .orderBy(contagensEstoque.createdAt);

        if (contagensInsumo.length > 0) {
          analise[insumoId].estoqueInicial = parseFloat(contagensInsumo[0].quantidadeAnterior || "0"); 
          analise[insumoId].estoqueFinal = parseFloat(contagensInsumo[contagensInsumo.length - 1].quantidadeContada);
        }
      }

      // 6. Cálculo da Divergência
      // Fórmula: Estoque Final Esperado = Inicial + Compras - Vendas - Perdas
      // Divergência = Estoque Final Real (Contagem) - Estoque Final Esperado
      
      return Object.values(analise)
        .filter(i => i.consumoTeorico > 0 || i.compras > 0 || i.estoqueFinal !== null)
        .map(item => {
          let divergencia = 0;
          let estoqueEsperado = 0;

          if (item.estoqueInicial !== null && item.estoqueFinal !== null) {
            estoqueEsperado = item.estoqueInicial + item.compras - item.consumoTeorico - item.perdaDeclarada;
            divergencia = item.estoqueFinal - estoqueEsperado;
          }

          return {
            ...item,
            estoqueEsperado,
            divergencia, // Negativo = Faltou (Prejuízo), Positivo = Sobrou
            custoDivergencia: divergencia * item.custoUnitario * -1 // Inverte sinal para mostrar prejuízo como positivo (custo)
          };
        })
        .sort((a, b) => b.custoDivergencia - a.custoDivergencia);
    }),
});
