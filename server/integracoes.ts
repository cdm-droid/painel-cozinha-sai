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

// Configuração da API Anota Aí - URL correta conforme documentação oficial
// Endpoint: https://api-parceiros.anota.ai/partnerauth/ping/list
const ANOTA_AI_API_BASE = "https://api-parceiros.anota.ai/partnerauth";
const ANOTA_AI_TOKEN = process.env.ANOTA_AI_API_TOKEN || "";
const ANOTA_AI_STORE_ID = process.env.ANOTA_AI_STORE_ID || "";

export const integracoesRouter = router({
  // Sincronizar Vendas (Manual ou Agendado)
  sincronizarAnotaAi: publicProcedure
    .input(z.object({
      data: z.string().optional(), // YYYY-MM-DD. Se vazio, pega o dia atual
    }).optional())
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verificar se o token está configurado
      if (!ANOTA_AI_TOKEN) {
        throw new Error("Token do Anota Aí não configurado. Configure ANOTA_AI_API_TOKEN nas variáveis de ambiente.");
      }

      // 1. Definir data de busca
      const dataBusca = input?.data || new Date().toISOString().split('T')[0];
      
      console.log(`[Integração] Iniciando sincronização Anota Aí para: ${dataBusca}`);
      console.log(`[Integração] Usando Store ID: ${ANOTA_AI_STORE_ID}`);

      try {
        // 2. Buscar lista de pedidos do dia na API do Anota Aí
        // Endpoint correto: GET /partnerauth/ping/list
        const listResponse = await axios.get(`${ANOTA_AI_API_BASE}/ping/list`, {
          headers: {
            'Authorization': ANOTA_AI_TOKEN, // Token direto, sem prefixo "Bearer"
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          params: {
            excludeIfood: '1' // Não exibir pedidos de origem iFood
          },
          timeout: 15000 
        });

        console.log(`[Integração] Resposta da API:`, JSON.stringify(listResponse.data).substring(0, 200));

        // Verificar se a resposta foi bem-sucedida
        if (!listResponse.data.success) {
          throw new Error(`API retornou erro: ${JSON.stringify(listResponse.data)}`);
        }

        const pedidosLista = listResponse.data.info?.docs || [];
        let novosPedidos = 0;
        let pedidosProcessados = 0;

        console.log(`[Integração] ${pedidosLista.length} pedidos encontrados na lista`);

        // 3. Para cada pedido na lista, buscar detalhes completos
        for (const pedidoResumo of pedidosLista) {
          pedidosProcessados++;
          
          // Verificar se já importamos este pedido
          const [existe] = await db.select({ id: vendasExternas.id })
            .from(vendasExternas)
            .where(eq(vendasExternas.externalId, String(pedidoResumo._id)))
            .limit(1);

          if (existe) {
            console.log(`[Integração] Pedido ${pedidoResumo._id} já existe, pulando...`);
            continue;
          }

          // Buscar detalhes completos do pedido
          // Endpoint: GET /partnerauth/ping/get/{order_Id}
          try {
            const detailResponse = await axios.get(`${ANOTA_AI_API_BASE}/ping/get/${pedidoResumo._id}`, {
              headers: {
                'Authorization': ANOTA_AI_TOKEN,
                'Content-Type': 'application/json'
              },
              timeout: 10000
            });

            if (!detailResponse.data.success) {
              console.error(`[Integração] Erro ao buscar detalhes do pedido ${pedidoResumo._id}`);
              continue;
            }

            const pedido = detailResponse.data.info;

            // Determinar status baseado no campo 'check'
            // check: 1 = novo, 2 = aceito, 3 = pronto, 4 = finalizado, 5 = cancelado
            let status = 'pendente';
            if (pedido.check === 4) status = 'concluido';
            else if (pedido.check === 5) status = 'cancelado';
            else if (pedido.check >= 2) status = 'em_andamento';

            // Inserir Venda
            const resultVenda = await db.insert(vendasExternas).values({
              externalId: String(pedido._id || pedido.id),
              origem: "AnotaAi",
              dataVenda: new Date(pedido.createdAt),
              valorTotal: String(pedido.total || 0),
              taxaEntrega: String(pedido.deliveryFee || 0),
              status: status,
              clienteNome: pedido.customer?.name || "Cliente",
              jsonDados: pedido,
            });

            const vendaId = resultVenda[0].insertId;
            novosPedidos++;

            console.log(`[Integração] Pedido ${pedido._id} importado com sucesso (ID: ${vendaId})`);

            // 4. Processar Itens do Pedido
            if (pedido.items && Array.isArray(pedido.items)) {
              for (const item of pedido.items) {
                await db.insert(itensVendaExterna).values({
                  vendaId,
                  externalProdutoId: String(item.internalId || item._id || item.id || ''),
                  produtoNome: item.name,
                  quantidade: String(item.quantity || 1),
                  precoUnitario: String(item.price || 0),
                  observacoes: item.observation || null,
                });

                // 5. Auto-Discovery: Adicionar ao mapa se for produto novo
                const [existeMapa] = await db.select()
                  .from(mapaProdutos)
                  .where(eq(mapaProdutos.externalProdutoNome, item.name))
                  .limit(1);

                if (!existeMapa) {
                  await db.insert(mapaProdutos).values({
                    externalProdutoId: String(item.internalId || item._id || ''),
                    externalProdutoNome: item.name,
                    fichaTecnicaId: null,
                  });
                }
              }
            }
          } catch (detailError: any) {
            console.error(`[Integração] Erro ao processar pedido ${pedidoResumo._id}:`, detailError.message);
            // Continua para o próximo pedido
          }
        }

        return { 
          success: true, 
          message: `Sincronização concluída. ${novosPedidos} novos pedidos importados de ${pedidosProcessados} processados.`,
          novosPedidos,
          totalProcessados: pedidosProcessados
        };

      } catch (error: any) {
        console.error("[Integração] Erro ao sincronizar:", error.message);
        
        // Tratamento específico para erros HTTP
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
          
          if (status === 403) {
            throw new Error(`Acesso negado (403). Verifique se o token está correto e se a loja tem permissão para usar a API. Detalhes: ${JSON.stringify(data)}`);
          } else if (status === 401) {
            throw new Error(`Não autorizado (401). Token inválido ou expirado.`);
          } else {
            throw new Error(`Erro da API (${status}): ${JSON.stringify(data)}`);
          }
        }
        
        throw new Error(`Falha na integração: ${error.message}`);
      }
    }),

  // Testar conexão com a API do Anota Aí
  testarConexao: publicProcedure
    .query(async () => {
      if (!ANOTA_AI_TOKEN) {
        return { 
          success: false, 
          message: "Token não configurado",
          configured: false
        };
      }

      try {
        const response = await axios.get(`${ANOTA_AI_API_BASE}/ping/list`, {
          headers: {
            'Authorization': ANOTA_AI_TOKEN,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          params: {
            excludeIfood: '1'
          },
          timeout: 10000
        });

        return {
          success: response.data.success === true,
          message: response.data.success ? "Conexão estabelecida com sucesso" : "API retornou erro",
          configured: true,
          pedidosHoje: response.data.info?.count || 0
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.status === 403 
            ? "Acesso negado. Verifique o token e permissões da loja."
            : `Erro: ${error.message}`,
          configured: true,
          errorCode: error.response?.status
        };
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
