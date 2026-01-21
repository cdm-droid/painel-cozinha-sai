import { z } from "zod";
import { eq, and, gte, lte, sql, desc } from "drizzle-orm";
import { getDb } from "./db";
import { 
  vendasExternas, 
  itensVendaExterna, 
  mapaProdutos, 
  fichasTecnicas,
  perdas
} from "../drizzle/schema";
import { publicProcedure, router } from "./_core/trpc";

export const analiseRouter = router({
  // Obter Resumo Financeiro (KPIs)
  resumoFinanceiro: publicProcedure
    .input(z.object({
      dataInicio: z.string(), // YYYY-MM-DD
      dataFim: z.string(),    // YYYY-MM-DD
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const inicio = new Date(input.dataInicio);
      inicio.setHours(0, 0, 0, 0);
      const fim = new Date(input.dataFim);
      fim.setHours(23, 59, 59, 999);

      // 1. Buscar Vendas no Período (apenas concluídas)
      const vendas = await db.select()
        .from(vendasExternas)
        .where(and(
          gte(vendasExternas.dataVenda, inicio),
          lte(vendasExternas.dataVenda, fim),
          eq(vendasExternas.status, 'concluido')
        ));

      // 2. Calcular Faturamento Bruto e Líquido
      let faturamentoBruto = 0;
      let taxasEntrega = 0;
      const vendasIds: number[] = [];

      for (const v of vendas) {
        faturamentoBruto += parseFloat(v.valorTotal);
        taxasEntrega += parseFloat(v.taxaEntrega || "0");
        vendasIds.push(v.id);
      }

      const faturamentoProdutos = faturamentoBruto - taxasEntrega;

      // 3. Buscar Itens Vendidos para Calcular Custo (CMV Teórico)
      // Precisamos cruzar: Item Venda -> Mapa -> Ficha Técnica
      let custoMercadoria = 0;
      let itensSemVinculo = 0;
      const performanceProdutos: Record<string, { qtd: number, faturamento: number, custo: number, nome: string }> = {};

      if (vendasIds.length > 0) {
        // Busca todos os itens das vendas encontradas
        const itens = await db.select({
          qtd: itensVendaExterna.quantidade,
          preco: itensVendaExterna.precoUnitario,
          nomeExterno: itensVendaExterna.produtoNome,
          fichaCusto: fichasTecnicas.custoTotal,
          fichaNome: fichasTecnicas.produto,
          mapaId: mapaProdutos.id
        })
        .from(itensVendaExterna)
        .leftJoin(mapaProdutos, eq(itensVendaExterna.externalProdutoId, mapaProdutos.externalProdutoId))
        .leftJoin(fichasTecnicas, eq(mapaProdutos.fichaTecnicaId, fichasTecnicas.id))
        // Workaround para "IN" clause segura no Drizzle MySQL (dependendo da versão)
        // Aqui simplificado, em produção com muitos dados faríamos batches
        .where(sql`${itensVendaExterna.vendaId} IN ${vendasIds}`);

        for (const item of itens) {
          const qtd = parseFloat(item.qtd);
          const precoTotal = parseFloat(item.preco) * qtd;
          
          let custoItem = 0;
          let nomeProduto = item.nomeExterno;

          if (item.fichaCusto) {
            custoItem = parseFloat(item.fichaCusto) * qtd;
            nomeProduto = item.fichaNome || item.nomeExterno;
          } else {
            itensSemVinculo++;
          }

          custoMercadoria += custoItem;

          // Agrupar para Curva ABC
          if (!performanceProdutos[nomeProduto]) {
            performanceProdutos[nomeProduto] = { qtd: 0, faturamento: 0, custo: 0, nome: nomeProduto };
          }
          performanceProdutos[nomeProduto].qtd += qtd;
          performanceProdutos[nomeProduto].faturamento += precoTotal;
          performanceProdutos[nomeProduto].custo += custoItem;
        }
      }

      // 4. Buscar Perdas Operacionais no Período (Desperdício)
      const perdasRegistradas = await db.select({
        custo: perdas.custoPerda
      })
      .from(perdas)
      .where(and(
        gte(perdas.createdAt, inicio),
        lte(perdas.createdAt, fim)
      ));

      let custoPerdas = 0;
      for (const p of perdasRegistradas) {
        custoPerdas += parseFloat(p.custo || "0");
      }

      // 5. Consolidar Curva ABC (Top Produtos)
      const rankingProdutos = Object.values(performanceProdutos)
        .sort((a, b) => (b.faturamento - b.custo) - (a.faturamento - a.custo)) // Ordenar por Lucro Bruto
        .slice(0, 10); // Top 10

      // Cálculos Finais
      const lucroBruto = faturamentoProdutos - custoMercadoria;
      const resultadoOperacional = lucroBruto - custoPerdas;
      const cmvPercentual = faturamentoProdutos > 0 ? (custoMercadoria / faturamentoProdutos) * 100 : 0;

      return {
        faturamentoBruto,
        faturamentoProdutos, // Base para CMV
        taxasEntrega,
        custoMercadoria, // CMV R$
        cmvPercentual,   // CMV %
        lucroBruto,
        custoPerdas,
        resultadoOperacional,
        itensSemVinculo,
        rankingProdutos
      };
    }),
});
