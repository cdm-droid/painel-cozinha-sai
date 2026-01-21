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
  contagensEstoque
} from "../drizzle/schema";
import { publicProcedure, router } from "./_core/trpc";

export const analiseEstoqueRouter = router({
  // Relatório de Divergência (Auditoria)
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

      // 1. Buscar Vendas no Período
      const vendas = await db.select({ id: vendasExternas.id })
        .from(vendasExternas)
        .where(and(
          gte(vendasExternas.dataVenda, inicio),
          lte(vendasExternas.dataVenda, fim),
          eq(vendasExternas.status, 'concluido')
        ));
      
      const vendasIds = vendas.map(v => v.id);

      // Mapa para acumular dados por Insumo
      // Key: insumoId, Value: { dados }
      const analise: Record<number, {
        id: number,
        nome: string,
        unidade: string,
        consumoTeorico: number, // Vendas * Ficha
        perdaDeclarada: number, // Registro de perdas
        entradas: number,       // Compras/Ajustes positivos
        saidasManuais: number,  // Ajustes negativos manuais
        estoqueAtual: number,
        custoUnitario: number
      }> = {};

      // Inicializar com todos os insumos ativos
      const todosInsumos = await db.select().from(insumos).where(eq(insumos.ativo, true));
      for (const ins of todosInsumos) {
        analise[ins.id] = {
          id: ins.id,
          nome: ins.nome,
          unidade: ins.unidade,
          consumoTeorico: 0,
          perdaDeclarada: 0,
          entradas: 0,
          saidasManuais: 0,
          estoqueAtual: parseFloat(ins.estoqueAtual),
          custoUnitario: parseFloat(ins.custoUnitario)
        };
      }

      // 2. Calcular Consumo Teórico (Baseado nas Vendas Importadas)
      if (vendasIds.length > 0) {
        // Busca itens vendidos que tenham ficha técnica vinculada
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
          const componentes = item.componentes as any[]; // Array de ingredientes da ficha

          if (componentes && Array.isArray(componentes)) {
            for (const comp of componentes) {
              const insumoId = parseInt(comp.insumoId);
              if (analise[insumoId]) {
                // Se vendi 10 Burgers e cada um leva 0.150kg de carne:
                // Consumo = 10 * 0.150 = 1.5kg
                analise[insumoId].consumoTeorico += (parseFloat(comp.quantidade) * qtdVenda);
              }
            }
          }
        }
      }

      // 3. Somar Perdas Declaradas (Registradas na tela de Perdas)
      const perdasPeriodo = await db.select()
        .from(perdas)
        .where(and(gte(perdas.createdAt, inicio), lte(perdas.createdAt, fim)));

      for (const p of perdasPeriodo) {
        if (analise[p.insumoId]) {
          analise[p.insumoId].perdaDeclarada += parseFloat(p.quantidade);
        }
      }

      // 4. Analisar Movimentações Manuais (Contagens de Estoque)
      // Aqui assumimos: Diferença Positiva = Entrada/Compra. Diferença Negativa = Ajuste/Quebra não identificada.
      // OBS: Isso é uma aproximação baseada no modelo atual.
      const contagens = await db.select()
        .from(contagensEstoque)
        .where(and(gte(contagensEstoque.createdAt, inicio), lte(contagensEstoque.createdAt, fim)));

      for (const c of contagens) {
        const diff = parseFloat(c.diferenca || "0");
        if (analise[c.insumoId]) {
          if (diff > 0) {
            analise[c.insumoId].entradas += diff;
          } else {
            // Se for negativo, foi uma saída manual (ajuste de contagem)
            analise[c.insumoId].saidasManuais += Math.abs(diff);
          }
        }
      }

      // 5. Formatar e Calcular Divergência
      // Focamos apenas nos itens que tiveram alguma movimentação para não poluir o relatório
      return Object.values(analise)
        .filter(i => i.consumoTeorico > 0 || i.perdaDeclarada > 0 || i.saidasManuais > 0)
        .map(item => {
          // A "Saída Total Real" é o que saiu do estoque fisicamente (ajustes manuais) + o que foi declarado como perda
          const saidaReal = item.saidasManuais + item.perdaDeclarada;
          
          // Divergência:
          // Se a Saída Real for MUITO maior que o Consumo Teórico, algo está errado (perda não declarada).
          // Se a Saída Real for menor, pode ser erro de ficha técnica (sobra).
          // NOTA: Como 'saidasManuais' inclui o ajuste de fim de dia, ela tende a englobar o consumo teórico.
          // O cálculo ideal de divergência aqui é: (O que o sistema baixou automaticamente vs O que foi contado).
          // Como este sistema baixa estoque na venda (se implementado) ou apenas ajusta na contagem:
          
          // Lógica Simplificada para Gestão Visual:
          // Consumo Teórico: O que o Anota Aí diz que vendeu.
          // Saída Real (Ajustes): O que o operador disse que sumiu do estoque na contagem.
          
          const divergencia = item.saidasManuais - item.consumoTeorico; 
          // Se > 0: Saiu mais do estoque (contagem) do que foi vendido. (PREJUÍZO/PERDA)
          // Se < 0: Vendeu-se mais do que saiu do estoque?? (Erro de ficha ou sobra)

          return {
            ...item,
            divergencia,
            custoDivergencia: divergencia * item.custoUnitario
          };
        })
        .sort((a, b) => b.custoDivergencia - a.custoDivergencia); // Ordenar pelos maiores prejuízos
    }),
});
