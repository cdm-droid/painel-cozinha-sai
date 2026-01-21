import { z } from "zod";
import axios from "axios";
import { eq, sql, and } from "drizzle-orm";
import { getDb } from "./db";
import { 
  vendasExternas, 
  itensVendaExterna, 
  mapaProdutos 
} from "../drizzle/schema";
import { publicProcedure, router } from "./_core/trpc";

// Configuração da API (Idealmente mover para variáveis de ambiente .env)
const ANOTA_AI_API_URL = process.env.ANOTA_AI_API_URL || "https://api.anota.ai/v1"; 
const ANOTA_AI_TOKEN = process.env.ANOTA_AI_TOKEN || ""; // Coloque sua chave aqui para testes locais

export const integracoesRouter = router({
  // Sincronizar Vendas (Manual ou Agendado)
  sincronizarAnotaAi: publicProcedure
    .input(z.object({
      data: z.string().optional(), // YYYY-MM-DD. Se vazio, pega o dia atual
    }).optional())
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // 1. Definir data de busca
      const dataBusca = input?.data || new Date().toISOString().split('T')[0];
      
      console.log(`[Integração] Iniciando sincronização Anota Aí para: ${dataBusca}`);

      try {
        // 2. Buscar pedidos na API Externa
        // OBS: Ajustar esta chamada conforme a documentação oficial da API do Anota Aí
        const response = await axios.get(`${ANOTA_AI_API_URL}/orders`, {
          headers: {
            'Authorization': ANOTA_AI_TOKEN,
            'Content-Type': 'application/json'
          },
          params: {
            date: dataBusca, // Exemplo de parâmetro
            limit: 100
          },
          timeout: 10000 
        });

        const pedidosExternos = response.data.orders || []; // Ajustar campo conforme retorno real
        let novosPedidos = 0;

        // 3. Processar cada pedido
        for (const pedido of pedidosExternos) {
          // Verificar se já importamos este pedido
          const [existe] = await db.select({ id: vendasExternas.id })
            .from(vendasExternas)
            .where(eq(vendasExternas.externalId, String(pedido.id)))
            .limit(1);

          if (existe) continue; // Pula se já existe

          // Inserir Venda (Transação implícita)
          const resultVenda = await db.insert(vendasExternas).values({
            externalId: String(pedido.id),
            origem: "AnotaAi",
            dataVenda: new Date(pedido.createdAt), // Ajustar campo de data
            valorTotal: String(pedido.total || 0),
            taxaEntrega: String(pedido.deliveryFee || 0),
            status: pedido.status === 1 ? 'concluido' : 'cancelado', // Ajustar status code
            clienteNome: pedido.customer?.name || "Cliente",
            jsonDados: pedido, // Salva tudo para garantia
          });

          const vendaId = resultVenda[0].insertId;
          novosPedidos++;

          // 4. Processar Itens do Pedido
          if (pedido.items && Array.isArray(pedido.items)) {
            for (const item of pedido.items) {
              await db.insert(itensVendaExterna).values({
                vendaId,
                externalProdutoId: String(item.productId),
                produtoNome: item.name,
                quantidade: String(item.quantity || 1),
                precoUnitario: String(item.price || 0),
                observacoes: item.observation,
              });

              // 5. Auto-Discovery: Adicionar ao mapa se for produto novo
              // Isso popula a lista para você vincular depois no painel gestor
              const [existeMapa] = await db.select()
                .from(mapaProdutos)
                .where(eq(mapaProdutos.externalProdutoNome, item.name))
                .limit(1);

              if (!existeMapa) {
                await db.insert(mapaProdutos).values({
                  externalProdutoId: String(item.productId),
                  externalProdutoNome: item.name,
                  fichaTecnicaId: null, // Começa sem vínculo
                });
              }
            }
          }
        }

        return { 
          success: true, 
          message: `Sincronização concluída. ${novosPedidos} novos pedidos importados.`,
          novosPedidos 
        };

      } catch (error: any) {
        console.error("[Integração] Erro ao sincronizar:", error.message);
        throw new Error(`Falha na integração: ${error.message}`);
      }
    }),

  // Listar produtos externos pendentes de vínculo (Para o Painel Gestor)
  listarProdutosSemVinculo: publicProcedure
    .query(async () => {
      const db = await getDb();
      if (!db) return [];

      return await db.select()
        .from(mapaProdutos)
        .where(sql`${mapaProdutos.fichaTecnicaId} IS NULL`)
        .orderBy(mapaProdutos.externalProdutoNome);
    }),

  // Vincular produto externo a uma ficha técnica
  vincularProduto: publicProcedure
    .input(z.object({
      mapaId: z.number(),
      fichaTecnicaId: z.number(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.update(mapaProdutos)
        .set({ fichaTecnicaId: input.fichaTecnicaId })
        .where(eq(mapaProdutos.id, input.mapaId));

      return { success: true };
    }),
});
