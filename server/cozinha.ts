import { eq, like, and, or, desc, asc, sql, gte } from "drizzle-orm";
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
  InsertInsumo,
  InsertFichaTecnica,
  InsertContagemEstoque,
  InsertPerda,
  InsertDiarioProducao,
  InsertContagemDiaria,
  InsertAuditLog,
  InsertDever,
  InsertDeverConcluido,
  InsertLoteProducao,
  InsertColaborador,
  ComponenteFicha
} from "../drizzle/schema";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

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
          estoqueMinimo: item.estoqueMinimo,
          estoqueContado: item.estoqueContado,
          unidade: item.unidade,
          status: item.status,
          responsavel: input.responsavel,
          observacao: input.observacao,
        });
      }

      return { success: true, count: input.itens.length };
    }),

  // Obter resumo de contagens por período
  resumo: publicProcedure
    .input(z.object({
      dias: z.number().default(7),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const dias = input?.dias || 7;
      const dataInicio = new Date();
      dataInicio.setDate(dataInicio.getDate() - dias);
      dataInicio.setHours(0, 0, 0, 0);

      const result = await db.select({
        data: sql<string>`DATE(${contagensDiarias.dataContagem})`,
        totalItens: sql<number>`COUNT(*)`,
        criticos: sql<number>`SUM(CASE WHEN ${contagensDiarias.status} = 'Crítico' THEN 1 ELSE 0 END)`,
        baixos: sql<number>`SUM(CASE WHEN ${contagensDiarias.status} = 'Baixo' THEN 1 ELSE 0 END)`,
        ok: sql<number>`SUM(CASE WHEN ${contagensDiarias.status} = 'OK' THEN 1 ELSE 0 END)`,
      })
      .from(contagensDiarias)
      .where(gte(contagensDiarias.dataContagem, dataInicio))
      .groupBy(sql`DATE(${contagensDiarias.dataContagem})`)
      .orderBy(desc(sql`DATE(${contagensDiarias.dataContagem})`));

      return result;
    }),
});


// ============== AUDITORIA ==============

export const auditoriaRouter = router({
  // Listar logs de auditoria
  list: publicProcedure
    .input(z.object({
      limit: z.number().default(50),
      criticidade: z.enum(["normal", "importante", "critico"]).optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(auditLogs);
      
      if (input?.criticidade) {
        query = query.where(eq(auditLogs.criticidade, input.criticidade)) as typeof query;
      }

      return await query
        .orderBy(desc(auditLogs.createdAt))
        .limit(input?.limit || 50);
    }),

  // Registrar log de auditoria
  registrar: publicProcedure
    .input(z.object({
      acao: z.string(),
      detalhes: z.string().optional(),
      criticidade: z.enum(["normal", "importante", "critico"]).default("normal"),
      usuario: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(auditLogs).values({
        acao: input.acao,
        detalhes: input.detalhes,
        criticidade: input.criticidade,
        usuario: input.usuario || "Sistema",
      });

      return { success: true, id: result[0].insertId };
    }),
});

// ============== DEVERES ==============

export const deveresRouter = router({
  // Listar todos os deveres
  list: publicProcedure
    .input(z.object({
      secao: z.enum(["abertura", "durante_operacao", "fechamento"]).optional(),
      categoria: z.enum(["operacional", "manutencao", "limpeza", "administrativo"]).optional(),
      ativo: z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(deveres);
      
      const conditions = [];
      if (input?.secao) {
        conditions.push(eq(deveres.secao, input.secao));
      }
      if (input?.categoria) {
        conditions.push(eq(deveres.categoria, input.categoria));
      }
      if (input?.ativo !== undefined) {
        conditions.push(eq(deveres.ativo, input.ativo));
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as typeof query;
      }

      return await query.orderBy(asc(deveres.categoria), asc(deveres.secao), asc(deveres.ordem));
    }),

  // Listar deveres para uma data específica (considerando recorrência)
  listForDate: publicProcedure
    .input(z.object({
      data: z.string(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const data = new Date(input.data);
      const diaSemana = data.getDay(); // 0-6
      const diaMes = data.getDate(); // 1-31

      // Buscar todos os deveres ativos
      const todosDeveresAtivos = await db.select()
        .from(deveres)
        .where(eq(deveres.ativo, true))
        .orderBy(asc(deveres.categoria), asc(deveres.secao), asc(deveres.ordem));

      // Filtrar por recorrência
      return todosDeveresAtivos.filter(dever => {
        switch (dever.recorrencia) {
          case 'diaria':
            return true;
          case 'semanal':
            return dever.diaSemana === diaSemana;
          case 'mensal':
            return dever.diaMes === diaMes;
          case 'unica':
            if (!dever.dataEspecifica) return false;
            const dataEsp = new Date(dever.dataEspecifica);
            return dataEsp.toDateString() === data.toDateString();
          default:
            return true;
        }
      });
    }),

  // Criar dever
  create: publicProcedure
    .input(z.object({
      titulo: z.string(),
      descricao: z.string().optional(),
      categoria: z.enum(["operacional", "manutencao", "limpeza", "administrativo"]).default("operacional"),
      secao: z.enum(["abertura", "durante_operacao", "fechamento"]),
      recorrencia: z.enum(["diaria", "semanal", "mensal", "unica"]).default("diaria"),
      diaSemana: z.number().min(0).max(6).optional(),
      diaMes: z.number().min(1).max(31).optional(),
      dataEspecifica: z.string().optional(),
      horario: z.string().optional(),
      ordem: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(deveres).values({
        titulo: input.titulo,
        descricao: input.descricao,
        categoria: input.categoria,
        secao: input.secao,
        recorrencia: input.recorrencia,
        diaSemana: input.diaSemana,
        diaMes: input.diaMes,
        dataEspecifica: input.dataEspecifica ? new Date(input.dataEspecifica) : undefined,
        horario: input.horario,
        ordem: input.ordem || 0,
      });

      return { success: true, id: result[0].insertId };
    }),

  // Atualizar dever
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      titulo: z.string().optional(),
      descricao: z.string().optional(),
      categoria: z.enum(["operacional", "manutencao", "limpeza", "administrativo"]).optional(),
      secao: z.enum(["abertura", "durante_operacao", "fechamento"]).optional(),
      recorrencia: z.enum(["diaria", "semanal", "mensal", "unica"]).optional(),
      diaSemana: z.number().min(0).max(6).nullable().optional(),
      diaMes: z.number().min(1).max(31).nullable().optional(),
      dataEspecifica: z.string().nullable().optional(),
      horario: z.string().optional(),
      ordem: z.number().optional(),
      ativo: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const { id, ...updateData } = input;
      const updateValues: any = {};

      if (updateData.titulo !== undefined) updateValues.titulo = updateData.titulo;
      if (updateData.descricao !== undefined) updateValues.descricao = updateData.descricao;
      if (updateData.categoria !== undefined) updateValues.categoria = updateData.categoria;
      if (updateData.secao !== undefined) updateValues.secao = updateData.secao;
      if (updateData.recorrencia !== undefined) updateValues.recorrencia = updateData.recorrencia;
      if (updateData.diaSemana !== undefined) updateValues.diaSemana = updateData.diaSemana;
      if (updateData.diaMes !== undefined) updateValues.diaMes = updateData.diaMes;
      if (updateData.dataEspecifica !== undefined) {
        updateValues.dataEspecifica = updateData.dataEspecifica ? new Date(updateData.dataEspecifica) : null;
      }
      if (updateData.horario !== undefined) updateValues.horario = updateData.horario;
      if (updateData.ordem !== undefined) updateValues.ordem = updateData.ordem;
      if (updateData.ativo !== undefined) updateValues.ativo = updateData.ativo;

      await db.update(deveres)
        .set(updateValues)
        .where(eq(deveres.id, id));

      return { success: true };
    }),

  // Deletar dever
  delete: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Primeiro deletar conclusões relacionadas
      await db.delete(deveresConcluidos)
        .where(eq(deveresConcluidos.deverId, input.id));

      // Depois deletar o dever
      await db.delete(deveres)
        .where(eq(deveres.id, input.id));

      return { success: true };
    }),

  // Marcar dever como concluído
  concluir: publicProcedure
    .input(z.object({
      deverId: z.number(),
      responsavel: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const result = await db.insert(deveresConcluidos).values({
        deverId: input.deverId,
        dataReferencia: today,
        responsavel: input.responsavel,
      });

      return { success: true, id: result[0].insertId };
    }),

  // Listar deveres concluídos de uma data
  listConcluidos: publicProcedure
    .input(z.object({
      data: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const data = input?.data ? new Date(input.data) : new Date();
      data.setHours(0, 0, 0, 0);
      
      const dataFim = new Date(data);
      dataFim.setHours(23, 59, 59, 999);

      return await db.select()
        .from(deveresConcluidos)
        .where(and(
          gte(deveresConcluidos.dataReferencia, data),
          sql`${deveresConcluidos.dataReferencia} <= ${dataFim}`
        ));
    }),

  // Desmarcar dever como concluído
  desfazerConclusao: publicProcedure
    .input(z.object({
      deverId: z.number(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const dataFim = new Date(today);
      dataFim.setHours(23, 59, 59, 999);

      await db.delete(deveresConcluidos)
        .where(and(
          eq(deveresConcluidos.deverId, input.deverId),
          gte(deveresConcluidos.dataReferencia, today),
          sql`${deveresConcluidos.dataReferencia} <= ${dataFim}`
        ));

      return { success: true };
    }),
});


// ============== LOTES DE PRODUÇÃO (KANBAN) ==============

export const lotesProducaoRouter = router({
  // Listar todos os lotes de produção (ativos)
  list: publicProcedure
    .input(z.object({
      status: z.enum(["necessario", "em_producao", "pronto", "finalizado"]).optional(),
      incluirFinalizados: z.boolean().optional(),
      dataInicio: z.string().optional(), // Filtro por data de agendamento
      dataFim: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(lotesProducao);
      
      const conditions = [];
      
      if (input?.status) {
        conditions.push(eq(lotesProducao.status, input.status));
      } else if (!input?.incluirFinalizados) {
        // Por padrão, não mostrar finalizados
        conditions.push(sql`${lotesProducao.status} != 'finalizado'`);
      }

      // Filtro por intervalo de datas
      if (input?.dataInicio) {
        conditions.push(gte(lotesProducao.dataAgendada, new Date(input.dataInicio)));
      }
      if (input?.dataFim) {
        const dataFim = new Date(input.dataFim);
        dataFim.setHours(23, 59, 59, 999);
        conditions.push(sql`${lotesProducao.dataAgendada} <= ${dataFim}`);
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as typeof query;
      }

      return await query.orderBy(asc(lotesProducao.dataAgendada), desc(lotesProducao.criadoEm));
    }),

  // Listar lotes por mês (para calendário)
  listByMonth: publicProcedure
    .input(z.object({
      ano: z.number(),
      mes: z.number(), // 1-12
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const inicioMes = new Date(input.ano, input.mes - 1, 1);
      const fimMes = new Date(input.ano, input.mes, 0, 23, 59, 59, 999);

      const lotes = await db.select()
        .from(lotesProducao)
        .where(and(
          gte(lotesProducao.dataAgendada, inicioMes),
          sql`${lotesProducao.dataAgendada} <= ${fimMes}`
        ))
        .orderBy(asc(lotesProducao.dataAgendada));

      return lotes;
    }),

  // Buscar itens de preparo que precisam de produção (estoque baixo/crítico)
  itensNecessarios: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    // Buscar insumos da categoria Preparo com estoque baixo ou crítico
    const itens = await db.select()
      .from(insumos)
      .where(and(
        like(insumos.nome, '%(PR)%'),
        or(
          eq(insumos.status, 'Baixo'),
          eq(insumos.status, 'Crítico')
        )
      ))
      .orderBy(asc(insumos.status), asc(insumos.nome));

    return itens;
  }),

  // Criar novo lote de produção (com agendamento)
  create: publicProcedure
    .input(z.object({
      insumoId: z.number(),
      insumoNome: z.string(),
      insumoUnidade: z.string(),
      quantidadePlanejada: z.string(),
      dataAgendada: z.string().optional(), // Data para agendamento futuro
      responsavel: z.string().optional(),
      observacao: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(lotesProducao).values({
        insumoId: input.insumoId,
        insumoNome: input.insumoNome,
        insumoUnidade: input.insumoUnidade,
        quantidadePlanejada: input.quantidadePlanejada,
        dataAgendada: input.dataAgendada ? new Date(input.dataAgendada) : new Date(),
        responsavel: input.responsavel,
        observacao: input.observacao,
        status: "necessario",
      });

      return { success: true, id: result[0].insertId };
    }),

  // Iniciar produção (mover para em_producao)
  iniciarProducao: publicProcedure
    .input(z.object({
      id: z.number(),
      responsavel: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.update(lotesProducao)
        .set({
          status: "em_producao",
          responsavel: input.responsavel,
          iniciadoEm: new Date(),
        })
        .where(eq(lotesProducao.id, input.id));

      return { success: true };
    }),

  // Marcar como pronto
  marcarPronto: publicProcedure
    .input(z.object({
      id: z.number(),
      quantidadeProduzida: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const updateData: any = {
        status: "pronto",
        prontoEm: new Date(),
      };

      if (input.quantidadeProduzida) {
        updateData.quantidadeProduzida = input.quantidadeProduzida;
      }

      await db.update(lotesProducao)
        .set(updateData)
        .where(eq(lotesProducao.id, input.id));

      return { success: true };
    }),

  // Finalizar e atualizar estoque
  finalizar: publicProcedure
    .input(z.object({
      id: z.number(),
      quantidadeProduzida: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Buscar o lote
      const lote = await db.select().from(lotesProducao).where(eq(lotesProducao.id, input.id)).limit(1);
      if (!lote[0]) throw new Error("Lote não encontrado");

      // Atualizar o lote como finalizado
      await db.update(lotesProducao)
        .set({
          status: "finalizado",
          quantidadeProduzida: input.quantidadeProduzida,
          finalizadoEm: new Date(),
        })
        .where(eq(lotesProducao.id, input.id));

      // Atualizar o estoque do insumo
      const insumoAtual = await db.select().from(insumos).where(eq(insumos.id, lote[0].insumoId)).limit(1);
      if (insumoAtual[0]) {
        const novoEstoque = parseFloat(insumoAtual[0].estoqueAtual) + parseFloat(input.quantidadeProduzida);
        const estoqueMinimo = parseFloat(insumoAtual[0].estoqueMinimo);
        
        // Calcular novo status
        let novoStatus: "OK" | "Baixo" | "Crítico" = "OK";
        if (novoEstoque <= estoqueMinimo * 0.5) {
          novoStatus = "Crítico";
        } else if (novoEstoque <= estoqueMinimo) {
          novoStatus = "Baixo";
        }

        await db.update(insumos)
          .set({
            estoqueAtual: novoEstoque.toString(),
            status: novoStatus,
          })
          .where(eq(insumos.id, lote[0].insumoId));
      }

      // Registrar no diário de produção
      await db.insert(diarioProducao).values({
        fichaTecnicaId: null,
        produto: lote[0].insumoNome,
        quantidadeProduzida: input.quantidadeProduzida,
        unidade: lote[0].insumoUnidade,
        responsavel: lote[0].responsavel || "Operador",
        statusProducao: "Concluído",
        observacao: `Lote #${lote[0].id} finalizado via Kanban`,
      });

      return { success: true };
    }),

  // Mover lote para outro status (drag and drop)
  moverStatus: publicProcedure
    .input(z.object({
      id: z.number(),
      novoStatus: z.enum(["necessario", "em_producao", "pronto"]),
      responsavel: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const updateData: any = {
        status: input.novoStatus,
      };

      if (input.novoStatus === "em_producao") {
        updateData.iniciadoEm = new Date();
        if (input.responsavel) updateData.responsavel = input.responsavel;
      } else if (input.novoStatus === "pronto") {
        updateData.prontoEm = new Date();
      }

      await db.update(lotesProducao)
        .set(updateData)
        .where(eq(lotesProducao.id, input.id));

      return { success: true };
    }),

  // Excluir lote (apenas se não finalizado)
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(lotesProducao)
        .where(and(
          eq(lotesProducao.id, input),
          sql`${lotesProducao.status} != 'finalizado'`
        ));

      return { success: true };
    }),
});


// ============== COLABORADORES (EQUIPE) ==============

export const colaboradoresRouter = router({
  // Listar todos os colaboradores
  list: publicProcedure
    .input(z.object({
      funcao: z.enum(["cozinheiro", "auxiliar", "chapeiro", "atendente", "gerente", "outro"]).optional(),
      turno: z.enum(["manha", "tarde", "noite", "integral"]).optional(),
      ativo: z.boolean().optional(),
      search: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db.select().from(colaboradores);
      
      const conditions = [];
      
      if (input?.funcao) {
        conditions.push(eq(colaboradores.funcao, input.funcao));
      }
      
      if (input?.turno) {
        conditions.push(eq(colaboradores.turno, input.turno));
      }
      
      if (input?.ativo !== undefined) {
        conditions.push(eq(colaboradores.ativo, input.ativo));
      }
      
      if (input?.search) {
        conditions.push(
          or(
            like(colaboradores.nome, `%${input.search}%`),
            like(colaboradores.apelido, `%${input.search}%`),
            like(colaboradores.cargo, `%${input.search}%`)
          )
        );
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as any;
      }

      return await query.orderBy(asc(colaboradores.nome));
    }),

  // Buscar colaborador por ID
  getById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const result = await db.select().from(colaboradores).where(eq(colaboradores.id, input)).limit(1);
      return result[0] || null;
    }),

  // Criar novo colaborador
  create: publicProcedure
    .input(z.object({
      nome: z.string(),
      apelido: z.string().optional(),
      cargo: z.string(),
      funcao: z.enum(["cozinheiro", "auxiliar", "chapeiro", "atendente", "gerente", "outro"]),
      telefone: z.string().optional(),
      email: z.string().optional(),
      dataAdmissao: z.date().optional(),
      turno: z.enum(["manha", "tarde", "noite", "integral"]).optional(),
      observacoes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const newColaborador: InsertColaborador = {
        nome: input.nome,
        apelido: input.apelido,
        cargo: input.cargo,
        funcao: input.funcao,
        telefone: input.telefone,
        email: input.email,
        dataAdmissao: input.dataAdmissao,
        turno: input.turno || "integral",
        observacoes: input.observacoes,
        ativo: true,
      };

      const result = await db.insert(colaboradores).values(newColaborador);
      return { id: result[0].insertId, ...newColaborador };
    }),

  // Atualizar colaborador
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      nome: z.string().optional(),
      apelido: z.string().optional(),
      cargo: z.string().optional(),
      funcao: z.enum(["cozinheiro", "auxiliar", "chapeiro", "atendente", "gerente", "outro"]).optional(),
      telefone: z.string().optional(),
      email: z.string().optional(),
      dataAdmissao: z.date().optional(),
      turno: z.enum(["manha", "tarde", "noite", "integral"]).optional(),
      observacoes: z.string().optional(),
      ativo: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const { id, ...updateData } = input;
      
      await db.update(colaboradores)
        .set(updateData)
        .where(eq(colaboradores.id, id));

      return { success: true };
    }),

  // Excluir colaborador (soft delete - apenas desativa)
  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.update(colaboradores)
        .set({ ativo: false })
        .where(eq(colaboradores.id, input));

      return { success: true };
    }),

  // Listar colaboradores ativos para seleção (dropdown)
  listAtivos: publicProcedure
    .query(async () => {
      const db = await getDb();
      if (!db) return [];

      return await db.select({
        id: colaboradores.id,
        nome: colaboradores.nome,
        apelido: colaboradores.apelido,
        funcao: colaboradores.funcao,
      })
      .from(colaboradores)
      .where(eq(colaboradores.ativo, true))
      .orderBy(asc(colaboradores.nome));
    }),
});
