import { eq, like, and, or, desc, asc, sql, gte, inArray, notInArray, ne } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "./db";
import { 
  insumos, 
  fichasTecnicas, 
  contagensEstoque, 
  perdas, 
  diarioProducao,
  contagensDiarias,
  auditLogs,
  deveres,
  deveresConcluidos,
  lotesProducao,
  colaboradores,
  InsertColaborador
} from "../drizzle/schema";
import { publicProcedure, router } from "./_core/trpc";

// ============== INSUMOS ==============

export const insumosRouter = router({
  // Listar todos os insumos
  list: publicProcedure
    .input(z.object({
      categoria: z.string().optional(),
      status: z.enum(["OK", "Baixo", "Crítico"]).optional(),
      ativo: z.boolean().optional(),
      contagemDiaria: z.boolean().optional(),
      search: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(insumos);
      
      // Aplicar filtros se necessário
      const conditions = [];
      
      if (input?.categoria) {
        conditions.push(eq(insumos.categoria, input.categoria));
      }
      if (input?.status) {
        conditions.push(eq(insumos.status, input.status));
      }
      if (input?.ativo !== undefined) {
        conditions.push(eq(insumos.ativo, input.ativo));
      }
      if (input?.contagemDiaria !== undefined) {
        conditions.push(eq(insumos.contagemDiaria, input.contagemDiaria));
      }
      if (input?.search) {
        conditions.push(
          or(
            like(insumos.nome, `%${input.search}%`),
            like(insumos.codigo, `%${input.search}%`)
          )
        );
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as typeof query;
      }

      return await query.orderBy(asc(insumos.nome));
    }),

  // Buscar insumo por ID
  byId: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const result = await db.select().from(insumos).where(eq(insumos.id, input)).limit(1);
      return result[0] || null;
    }),

  // Criar novo insumo
  create: publicProcedure
    .input(z.object({
      codigo: z.string(),
      nome: z.string(),
      categoria: z.string(),
      unidade: z.string(),
      custoUnitario: z.string().default("0"),
      estoqueAtual: z.string().default("0"),
      estoqueMinimo: z.string().default("0"),
      status: z.enum(["OK", "Baixo", "Crítico"]).default("OK"),
      ativo: z.boolean().default(true),
      contagemDiaria: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(insumos).values(input);
      return { success: true, id: result[0].insertId };
    }),

  // Atualizar insumo
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      codigo: z.string().optional(),
      nome: z.string().optional(),
      categoria: z.string().optional(),
      unidade: z.string().optional(),
      custoUnitario: z.string().optional(),
      estoqueAtual: z.string().optional(),
      estoqueMinimo: z.string().optional(),
      status: z.enum(["OK", "Baixo", "Crítico"]).optional(),
      ativo: z.boolean().optional(),
      contagemDiaria: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const { id, ...data } = input;
      await db.update(insumos).set(data).where(eq(insumos.id, id));
      return { success: true };
    }),

  // Deletar insumo
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(insumos).where(eq(insumos.id, input));
      return { success: true };
    }),

  // Atualizar estoque (contagem)
  updateEstoque: publicProcedure
    .input(z.object({
      id: z.number(),
      quantidade: z.string(),
      visao: z.string().optional(),
      observacao: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Buscar quantidade anterior
      const [insumo] = await db.select().from(insumos).where(eq(insumos.id, input.id)).limit(1);
      if (!insumo) throw new Error("Insumo não encontrado");

      const quantidadeAnterior = insumo.estoqueAtual;
      const diferenca = parseFloat(input.quantidade) - parseFloat(quantidadeAnterior);

      // Atualizar estoque
      await db.update(insumos).set({ 
        estoqueAtual: input.quantidade,
        status: parseFloat(input.quantidade) <= parseFloat(insumo.estoqueMinimo) 
          ? (parseFloat(input.quantidade) <= parseFloat(insumo.estoqueMinimo) / 2 ? "Crítico" : "Baixo")
          : "OK"
      }).where(eq(insumos.id, input.id));

      // Registrar contagem
      await db.insert(contagensEstoque).values({
        insumoId: input.id,
        quantidadeContada: input.quantidade,
        quantidadeAnterior: quantidadeAnterior,
        diferenca: diferenca.toFixed(3),
        visao: input.visao,
        observacao: input.observacao,
      });

      return { success: true };
    }),

  // Listar categorias únicas
  categorias: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const result = await db.selectDistinct({ categoria: insumos.categoria }).from(insumos);
    return result.map(r => r.categoria);
  }),
});

// ============== FICHAS TÉCNICAS ==============

export const fichasTecnicasRouter = router({
  // Listar todas as fichas técnicas
  list: publicProcedure
    .input(z.object({
      categoria: z.string().optional(),
      search: z.string().optional(),
      visivelOperacional: z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(fichasTecnicas);
      
      const conditions = [];
      
      if (input?.categoria) {
        conditions.push(eq(fichasTecnicas.categoria, input.categoria));
      }
      if (input?.search) {
        conditions.push(
          or(
            like(fichasTecnicas.produto, `%${input.search}%`),
            like(fichasTecnicas.codigo, `%${input.search}%`)
          )
        );
      }
      if (input?.visivelOperacional !== undefined) {
        conditions.push(eq(fichasTecnicas.visivelOperacional, input.visivelOperacional));
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as typeof query;
      }

      return await query.orderBy(asc(fichasTecnicas.produto));
    }),

  // Buscar ficha por ID
  byId: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const result = await db.select().from(fichasTecnicas).where(eq(fichasTecnicas.id, input)).limit(1);
      return result[0] || null;
    }),

  // Criar nova ficha técnica
  create: publicProcedure
    .input(z.object({
      codigo: z.string(),
      produto: z.string(),
      categoria: z.string().optional(),
      rendimento: z.string().optional(),
      custoTotal: z.string().default("0"),
      precoVenda: z.string().optional(),
      cmv: z.string().optional(),
      markup: z.string().optional(),
      codigoPdv: z.string().optional(),
      nomePdv: z.string().optional(),
      modoPreparo: z.string().optional(),
      componentes: z.array(z.object({
        insumoId: z.string(),
        nome: z.string(),
        quantidade: z.number(),
        unidade: z.string(),
        custoUnitario: z.number(),
        subtotal: z.number(),
      })).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(fichasTecnicas).values({
        ...input,
        componentes: input.componentes || [],
      });
      return { success: true, id: result[0].insertId };
    }),

  // Atualizar ficha técnica
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      codigo: z.string().optional(),
      produto: z.string().optional(),
      categoria: z.string().optional(),
      rendimento: z.string().optional(),
      custoTotal: z.string().optional(),
      precoVenda: z.string().optional(),
      cmv: z.string().optional(),
      markup: z.string().optional(),
      codigoPdv: z.string().optional(),
      nomePdv: z.string().optional(),
      modoPreparo: z.string().optional(),
      visivelOperacional: z.boolean().optional(),
      componentes: z.array(z.object({
        insumoId: z.string(),
        nome: z.string(),
        quantidade: z.number(),
        unidade: z.string(),
        custoUnitario: z.number(),
        subtotal: z.number(),
      })).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const { id, ...data } = input;
      await db.update(fichasTecnicas).set(data).where(eq(fichasTecnicas.id, id));
      return { success: true };
    }),

  // Toggle visibilidade operacional
  toggleVisibilidade: publicProcedure
    .input(z.object({
      id: z.number(),
      visivelOperacional: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.update(fichasTecnicas)
        .set({ visivelOperacional: input.visivelOperacional })
        .where(eq(fichasTecnicas.id, input.id));
      return { success: true };
    }),

  // Deletar ficha técnica
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(fichasTecnicas).where(eq(fichasTecnicas.id, input));
      return { success: true };
    }),

  // Listar categorias únicas
  categorias: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const result = await db.selectDistinct({ categoria: fichasTecnicas.categoria }).from(fichasTecnicas);
    return result.map(r => r.categoria).filter(Boolean);
  }),

  // Atualizar modo de preparo por nome do produto
  updateModoPreparo: publicProcedure
    .input(z.object({
      produto: z.string(),
      modoPreparo: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.update(fichasTecnicas)
        .set({ modoPreparo: input.modoPreparo })
        .where(eq(fichasTecnicas.produto, input.produto));
      return { success: true };
    }),

  // Atualizar modos de preparo em lote
  updateModosPreparo: publicProcedure
    .input(z.array(z.object({
      produto: z.string(),
      modoPreparo: z.string(),
    })))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      let updated = 0;
      for (const item of input) {
        const result = await db.update(fichasTecnicas)
          .set({ modoPreparo: item.modoPreparo })
          .where(eq(fichasTecnicas.produto, item.produto));
        if (result[0].affectedRows > 0) updated++;
      }
      return { success: true, updated };
    }),
});

// ============== PERDAS ==============

export const perdasRouter = router({
  // Listar perdas
  list: publicProcedure
    .input(z.object({
      dataInicio: z.string().optional(),
      dataFim: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      return await db.select().from(perdas).orderBy(desc(perdas.createdAt));
    }),

  // Registrar perda
  create: publicProcedure
    .input(z.object({
      insumoId: z.number(),
      quantidade: z.string(),
      motivo: z.string(),
      observacao: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Buscar custo do insumo
      const [insumo] = await db.select().from(insumos).where(eq(insumos.id, input.insumoId)).limit(1);
      const custoPerda = insumo 
        ? (parseFloat(input.quantidade) * parseFloat(insumo.custoUnitario)).toFixed(2)
        : "0";

      const result = await db.insert(perdas).values({
        ...input,
        custoPerda,
      });

      // Atualizar estoque do insumo
      if (insumo) {
        const novoEstoque = parseFloat(insumo.estoqueAtual) - parseFloat(input.quantidade);
        await db.update(insumos).set({ 
          estoqueAtual: novoEstoque.toFixed(3),
          status: novoEstoque <= parseFloat(insumo.estoqueMinimo) 
            ? (novoEstoque <= parseFloat(insumo.estoqueMinimo) / 2 ? "Crítico" : "Baixo")
            : "OK"
        }).where(eq(insumos.id, input.insumoId));
      }

      return { success: true, id: result[0].insertId };
    }),
});

// ============== DIÁRIO DE PRODUÇÃO ==============

export const diarioProducaoRouter = router({
  // Listar produções
  list: publicProcedure
    .input(z.object({
      data: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      return await db.select().from(diarioProducao).orderBy(desc(diarioProducao.createdAt));
    }),

  // Registrar produção
  create: publicProcedure
    .input(z.object({
      fichaTecnicaId: z.number().optional(),
      produto: z.string(),
      quantidadeProduzida: z.string(),
      unidade: z.string().optional(),
      responsavel: z.string().optional(),
      status: z.enum(["Planejado", "Em Produção", "Concluído"]).default("Planejado"),
      observacao: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Buscar ficha técnica para calcular custo (se fornecida)
      let custoTotal = "0";
      if (input.fichaTecnicaId) {
        const [ficha] = await db.select().from(fichasTecnicas).where(eq(fichasTecnicas.id, input.fichaTecnicaId)).limit(1);
        if (ficha) {
          custoTotal = (parseFloat(input.quantidadeProduzida) * parseFloat(ficha.custoTotal)).toFixed(2);
        }
      }

      const result = await db.insert(diarioProducao).values({
        fichaTecnicaId: input.fichaTecnicaId || null,
        produto: input.produto,
        quantidadeProduzida: input.quantidadeProduzida,
        unidade: input.unidade || "un",
        responsavel: input.responsavel || "Equipe",
        custoTotal,
        observacao: input.observacao,
      });

      return { success: true, id: result[0].insertId };
    }),

  // Atualizar status da produção
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["Planejado", "Em Produção", "Concluído"]).optional(),
      responsavel: z.string().optional(),
      observacao: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const { id, ...updates } = input;
      await db.update(diarioProducao).set(updates).where(eq(diarioProducao.id, id));

      return { success: true };
    }),

  // Excluir produção
  delete: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(diarioProducao).where(eq(diarioProducao.id, input.id));

      return { success: true };
    }),
});

// ============== CONTAGENS ==============

export const contagensRouter = router({
  // Listar histórico de contagens
  list: publicProcedure
    .input(z.object({
      insumoId: z.number().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(contagensEstoque);
      
      if (input?.insumoId) {
        query = query.where(eq(contagensEstoque.insumoId, input.insumoId)) as typeof query;
      }

      return await query.orderBy(desc(contagensEstoque.createdAt));
    }),
});

// ============== DASHBOARD ==============

export const dashboardRouter = router({
  // Obter estatísticas gerais do dashboard
  stats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return {
      totalInsumos: 0,
      insumosAtivos: 0,
      insumosCriticos: 0,
      insumosBaixos: 0,
      totalFichas: 0,
      producoesHoje: 0,
      perdasHoje: 0,
      custoPerdasHoje: 0,
    };

    // Total de insumos
    const [totalInsumosResult] = await db.select({ count: sql<number>`COUNT(*)` }).from(insumos);
    const totalInsumos = totalInsumosResult?.count || 0;

    // Insumos ativos
    const [insumosAtivosResult] = await db.select({ count: sql<number>`COUNT(*)` }).from(insumos).where(eq(insumos.ativo, true));
    const insumosAtivos = insumosAtivosResult?.count || 0;

    // Insumos críticos
    const [insumosCriticosResult] = await db.select({ count: sql<number>`COUNT(*)` }).from(insumos).where(eq(insumos.status, 'Crítico'));
    const insumosCriticos = insumosCriticosResult?.count || 0;

    // Insumos baixos
    const [insumosBaixosResult] = await db.select({ count: sql<number>`COUNT(*)` }).from(insumos).where(eq(insumos.status, 'Baixo'));
    const insumosBaixos = insumosBaixosResult?.count || 0;

    // Total de fichas técnicas
    const [totalFichasResult] = await db.select({ count: sql<number>`COUNT(*)` }).from(fichasTecnicas);
    const totalFichas = totalFichasResult?.count || 0;

    // Produções de hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [producoesHojeResult] = await db.select({ count: sql<number>`COUNT(*)` }).from(diarioProducao).where(gte(diarioProducao.createdAt, today));
    const producoesHoje = producoesHojeResult?.count || 0;

    // Perdas de hoje
    const [perdasHojeResult] = await db.select({ 
      count: sql<number>`COUNT(*)`,
      total: sql<number>`COALESCE(SUM(custoPerda), 0)`
    }).from(perdas).where(gte(perdas.createdAt, today));
    const perdasHoje = perdasHojeResult?.count || 0;
    const custoPerdasHoje = perdasHojeResult?.total || 0;

    return {
      totalInsumos,
      insumosAtivos,
      insumosCriticos,
      insumosBaixos,
      totalFichas,
      producoesHoje,
      perdasHoje,
      custoPerdasHoje,
    };
  }),

  // Obter alertas de estoque crítico
  alertas: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const alertas = await db.select({
      id: insumos.id,
      nome: insumos.nome,
      estoqueAtual: insumos.estoqueAtual,
      estoqueMinimo: insumos.estoqueMinimo,
      unidade: insumos.unidade,
      status: insumos.status,
      updatedAt: insumos.updatedAt,
    })
    .from(insumos)
    .where(or(eq(insumos.status, 'Crítico'), eq(insumos.status, 'Baixo')))
    .orderBy(asc(insumos.status), asc(insumos.nome))
    .limit(10);

    return alertas;
  }),

  // Obter produções recentes
  producoesRecentes: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const producoes = await db.select()
      .from(diarioProducao)
      .orderBy(desc(diarioProducao.createdAt))
      .limit(5);

    return producoes;
  }),
});


// ============== CONTAGENS DIÁRIAS ==============

export const contagensDiariasRouter = router({
  // Listar histórico de contagens
  list: publicProcedure
    .input(z.object({
      dataInicio: z.string().optional(),
      dataFim: z.string().optional(),
      itemNome: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(contagensDiarias);
      
      if (input?.itemNome) {
        query = query.where(like(contagensDiarias.itemNome, `%${input.itemNome}%`)) as typeof query;
      }

      return await query.orderBy(desc(contagensDiarias.dataContagem));
    }),

  // Listar contagens de uma data específica
  listByDate: publicProcedure
    .input(z.object({
      data: z.string(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const dataInicio = new Date(input.data);
      dataInicio.setHours(0, 0, 0, 0);
      
      const dataFim = new Date(input.data);
      dataFim.setHours(23, 59, 59, 999);

      const result = await db.select()
        .from(contagensDiarias)
        .where(and(
          gte(contagensDiarias.dataContagem, dataInicio),
          sql`${contagensDiarias.dataContagem} <= ${dataFim}`
        ))
        .orderBy(asc(contagensDiarias.itemNome));

      return result;
    }),

  // Salvar contagem diária (múltiplos itens)
  saveContagem: publicProcedure
    .input(z.object({
      itens: z.array(z.object({
        itemNome: z.string(),
        estoqueMinimo: z.string(),
        estoqueContado: z.string(),
        unidade: z.string(),
        status: z.enum(["OK", "Baixo", "Crítico"]),
      })),
      responsavel: z.string().optional(),
      observacao: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const dataContagem = new Date();
      
      // Inserir cada item da contagem
      for (const item of input.itens) {
        await db.insert(contagensDiarias).values({
          dataContagem,
          itemNome: item.itemNome,
          estoqueMinimo
