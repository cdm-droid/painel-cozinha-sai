import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "operacional", "gestor"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Insumos (ingredientes/matérias-primas)
 */
export const insumos = mysqlTable("insumos", {
  id: int("id").autoincrement().primaryKey(),
  codigo: varchar("codigo", { length: 50 }).notNull().unique(),
  nome: varchar("nome", { length: 255 }).notNull(),
  categoria: varchar("categoria", { length: 100 }).notNull(),
  unidade: varchar("unidade", { length: 50 }).notNull(),
  custoUnitario: decimal("custoUnitario", { precision: 10, scale: 2 }).notNull().default("0"),
  estoqueAtual: decimal("estoqueAtual", { precision: 10, scale: 3 }).notNull().default("0"),
  estoqueMinimo: decimal("estoqueMinimo", { precision: 10, scale: 3 }).notNull().default("0"),
  status: mysqlEnum("status", ["OK", "Baixo", "Crítico"]).default("OK").notNull(),
  ativo: boolean("ativo").default(true).notNull(),
  contagemDiaria: boolean("contagemDiaria").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Insumo = typeof insumos.$inferSelect;
export type InsertInsumo = typeof insumos.$inferInsert;

/**
 * Fichas Técnicas (receitas/preparos)
 */
export const fichasTecnicas = mysqlTable("fichas_tecnicas", {
  id: int("id").autoincrement().primaryKey(),
  codigo: varchar("codigo", { length: 50 }).notNull().unique(),
  produto: varchar("produto", { length: 255 }).notNull(),
  categoria: varchar("categoria", { length: 100 }),
  rendimento: varchar("rendimento", { length: 100 }),
  custoTotal: decimal("custoTotal", { precision: 10, scale: 2 }).notNull().default("0"),
  precoVenda: decimal("precoVenda", { precision: 10, scale: 2 }),
  cmv: decimal("cmv", { precision: 5, scale: 2 }),
  markup: decimal("markup", { precision: 5, scale: 2 }),
  codigoPdv: varchar("codigoPdv", { length: 50 }),
  nomePdv: varchar("nomePdv", { length: 255 }),
  modoPreparo: text("modoPreparo"),
  componentes: json("componentes").$type<ComponenteFicha[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export interface ComponenteFicha {
  insumoId: string;
  nome: string;
  quantidade: number;
  unidade: string;
  custoUnitario: number;
  subtotal: number;
}

export type FichaTecnica = typeof fichasTecnicas.$inferSelect;
export type InsertFichaTecnica = typeof fichasTecnicas.$inferInsert;

/**
 * Contagens de Estoque (histórico)
 */
export const contagensEstoque = mysqlTable("contagens_estoque", {
  id: int("id").autoincrement().primaryKey(),
  insumoId: int("insumoId").notNull(),
  quantidadeContada: decimal("quantidadeContada", { precision: 10, scale: 3 }).notNull(),
  quantidadeAnterior: decimal("quantidadeAnterior", { precision: 10, scale: 3 }),
  diferenca: decimal("diferenca", { precision: 10, scale: 3 }),
  visao: varchar("visao", { length: 50 }),
  userId: int("userId"),
  observacao: text("observacao"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContagemEstoque = typeof contagensEstoque.$inferSelect;
export type InsertContagemEstoque = typeof contagensEstoque.$inferInsert;

/**
 * Registro de Perdas
 */
export const perdas = mysqlTable("perdas", {
  id: int("id").autoincrement().primaryKey(),
  insumoId: int("insumoId").notNull(),
  quantidade: decimal("quantidade", { precision: 10, scale: 3 }).notNull(),
  motivo: varchar("motivo", { length: 100 }).notNull(),
  observacao: text("observacao"),
  custoPerda: decimal("custoPerda", { precision: 10, scale: 2 }),
  userId: int("userId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Perda = typeof perdas.$inferSelect;
export type InsertPerda = typeof perdas.$inferInsert;

/**
 * Diário de Produção
 */
export const diarioProducao = mysqlTable("diario_producao", {
  id: int("id").autoincrement().primaryKey(),
  fichaTecnicaId: int("fichaTecnicaId"),
  produto: varchar("produto", { length: 255 }).notNull(),
  quantidadeProduzida: decimal("quantidadeProduzida", { precision: 10, scale: 2 }).notNull(),
  unidade: varchar("unidade", { length: 50 }).default("un"),
  responsavel: varchar("responsavel", { length: 100 }),
  statusProducao: mysqlEnum("statusProducao", ["Planejado", "Em Produção", "Concluído"]).default("Planejado").notNull(),
  custoTotal: decimal("custoTotal", { precision: 10, scale: 2 }),
  observacao: text("observacao"),
  userId: int("userId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DiarioProducao = typeof diarioProducao.$inferSelect;
export type InsertDiarioProducao = typeof diarioProducao.$inferInsert;

/**
 * Contagens Diárias de Estoque
 */
export const contagensDiarias = mysqlTable("contagens_diarias", {
  id: int("id").autoincrement().primaryKey(),
  dataContagem: timestamp("dataContagem").defaultNow().notNull(),
  itemNome: varchar("itemNome", { length: 255 }).notNull(),
  estoqueMinimo: decimal("estoqueMinimo", { precision: 10, scale: 2 }).notNull(),
  estoqueContado: decimal("estoqueContado", { precision: 10, scale: 2 }).notNull(),
  unidade: varchar("unidade", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["OK", "Baixo", "Crítico"]).notNull(),
  responsavel: varchar("responsavel", { length: 100 }),
  observacao: text("observacao"),
  userId: int("userId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContagemDiaria = typeof contagensDiarias.$inferSelect;
export type InsertContagemDiaria = typeof contagensDiarias.$inferInsert;


/**
 * Logs de Auditoria - Registro de todas as ações do sistema
 */
export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  acao: varchar("acao", { length: 100 }).notNull(),
  detalhes: text("detalhes"),
  criticidade: mysqlEnum("criticidade", ["normal", "importante", "critico"]).default("normal").notNull(),
  usuario: varchar("usuario", { length: 100 }),
  userId: int("userId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

/**
 * Checklist de Deveres - Tarefas diárias da operação
 */
export const deveres = mysqlTable("deveres", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descricao: text("descricao"),
  secao: mysqlEnum("secao", ["abertura", "durante_operacao", "fechamento"]).notNull(),
  horario: varchar("horario", { length: 10 }),
  ordem: int("ordem").default(0),
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Dever = typeof deveres.$inferSelect;
export type InsertDever = typeof deveres.$inferInsert;

/**
 * Registro de Deveres Concluídos
 */
export const deveresConcluidos = mysqlTable("deveres_concluidos", {
  id: int("id").autoincrement().primaryKey(),
  deverId: int("deverId").notNull(),
  dataReferencia: timestamp("dataReferencia").notNull(),
  concluidoEm: timestamp("concluidoEm").defaultNow().notNull(),
  responsavel: varchar("responsavel", { length: 100 }),
  userId: int("userId"),
});

export type DeverConcluido = typeof deveresConcluidos.$inferSelect;
export type InsertDeverConcluido = typeof deveresConcluidos.$inferInsert;

/**
 * Lotes de Produção (Kanban de Preparos)
 * Status: necessario -> em_producao -> pronto -> finalizado
 */
export const lotesProducao = mysqlTable("lotes_producao", {
  id: int("id").autoincrement().primaryKey(),
  // Referência ao insumo de preparo (categoria Preparo)
  insumoId: int("insumoId").notNull(),
  insumoNome: varchar("insumoNome", { length: 255 }).notNull(),
  insumoUnidade: varchar("insumoUnidade", { length: 50 }).notNull(),
  // Quantidade a produzir
  quantidadePlanejada: decimal("quantidadePlanejada", { precision: 10, scale: 3 }).notNull(),
  quantidadeProduzida: decimal("quantidadeProduzida", { precision: 10, scale: 3 }).default("0"),
  // Status do lote no Kanban
  status: mysqlEnum("status", ["necessario", "em_producao", "pronto", "finalizado"]).default("necessario").notNull(),
  // Responsável e timestamps
  responsavel: varchar("responsavel", { length: 100 }),
  userId: int("userId"),
  // Timestamps de cada etapa
  criadoEm: timestamp("criadoEm").defaultNow().notNull(),
  iniciadoEm: timestamp("iniciadoEm"),
  prontoEm: timestamp("prontoEm"),
  finalizadoEm: timestamp("finalizadoEm"),
  // Observações
  observacao: text("observacao"),
});

export type LoteProducao = typeof lotesProducao.$inferSelect;
export type InsertLoteProducao = typeof lotesProducao.$inferInsert;
