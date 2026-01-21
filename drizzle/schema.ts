import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
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
  visivelOperacional: boolean("visivelOperacional").default(false).notNull(),
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
 * Logs de Auditoria
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
 * Checklist de Deveres
 */
export const deveres = mysqlTable("deveres", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descricao: text("descricao"),
  categoria: mysqlEnum("categoria", ["operacional", "manutencao", "limpeza", "administrativo"]).default("operacional").notNull(),
  area: mysqlEnum("area", ["cozinha", "caixa", "area_externa", "salao", "estoque", "geral"]).default("geral"),
  fatorPrincipal: mysqlEnum("fatorPrincipal", ["seguranca", "higiene", "manutencao", "operacional", "qualidade", "outro"]).default("operacional"),
  responsavel: mysqlEnum("responsavel", ["gerente", "chapeiro", "auxiliar_cozinha", "atendente", "cozinheiro", "todos"]).default("todos"),
  operadorId: int("operadorId"),
  secao: mysqlEnum("secao", ["abertura", "durante_operacao", "fechamento"]).notNull(),
  recorrencia: mysqlEnum("recorrencia", ["diaria", "semanal", "mensal", "unica"]).default("diaria").notNull(),
  diaSemana: int("diaSemana"),
  diaMes: int("diaMes"),
  dataEspecifica: timestamp("dataEspecifica"),
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
 * Lotes de Produção (Kanban)
 */
export const lotesProducao = mysqlTable("lotes_producao", {
  id: int("id").autoincrement().primaryKey(),
  insumoId: int("insumoId").notNull(),
  insumoNome: varchar("insumoNome", { length: 255 }).notNull(),
  insumoUnidade: varchar("insumoUnidade", { length: 50 }).notNull(),
  quantidadePlanejada: decimal("quantidadePlanejada", { precision: 10, scale: 3 }).notNull(),
  quantidadeProduzida: decimal("quantidadeProduzida", { precision: 10, scale: 3 }).default("0"),
  status: mysqlEnum("status", ["necessario", "em_producao", "pronto", "finalizado"]).default("necessario").notNull(),
  dataAgendada: timestamp("dataAgendada").defaultNow().notNull(),
  responsavel: varchar("responsavel", { length: 100 }),
  userId: int("userId"),
  criadoEm: timestamp("criadoEm").defaultNow().notNull(),
  iniciadoEm: timestamp("iniciadoEm"),
  prontoEm: timestamp("prontoEm"),
  finalizadoEm: timestamp("finalizadoEm"),
  observacao: text("observacao"),
});

export type LoteProducao = typeof lotesProducao.$inferSelect;
export type InsertLoteProducao = typeof lotesProducao.$inferInsert;

/**
 * Colaboradores (Equipe)
 */
export const colaboradores = mysqlTable("colaboradores", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  apelido: varchar("apelido", { length: 100 }),
  cargo: varchar("cargo", { length: 100 }).notNull(),
  funcao: mysqlEnum("funcao", ["cozinheiro", "auxiliar", "chapeiro", "atendente", "gerente", "outro"]).default("auxiliar").notNull(),
  telefone: varchar("telefone", { length: 20 }),
  email: varchar("email", { length: 320 }),
  dataAdmissao: timestamp("dataAdmissao"),
  turno: mysqlEnum("turno", ["manha", "tarde", "noite", "integral"]).default("integral"),
  ativo: boolean("ativo").default(true).notNull(),
  observacoes: text("observacoes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Colaborador = typeof colaboradores.$inferSelect;
export type InsertColaborador = typeof colaboradores.$inferInsert;

/**
 * ==========================================
 * MÓDULO DE INTEGRAÇÃO & CMV
 * ==========================================
 */

/**
 * Espelho de Vendas Externas (Anota Aí / iFood)
 */
export const vendasExternas = mysqlTable("vendas_externas", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 100 }).notNull().unique(),
  origem: varchar("origem", { length: 50 }).default("AnotaAi").notNull(),
  dataVenda: timestamp("dataVenda").notNull(),
  valorTotal: decimal("valorTotal", { precision: 10, scale: 2 }).notNull(),
  taxaEntrega: decimal("taxaEntrega", { precision: 10, scale: 2 }).default("0"),
  descontos: decimal("descontos", { precision: 10, scale: 2 }).default("0"),
  status: varchar("status", { length: 50 }).notNull(),
  clienteNome: varchar("clienteNome", { length: 255 }),
  jsonDados: json("jsonDados"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VendaExterna = typeof vendasExternas.$inferSelect;
export type InsertVendaExterna = typeof vendasExternas.$inferInsert;

/**
 * Itens vendidos em cada pedido externo.
 */
export const itensVendaExterna = mysqlTable("itens_venda_externa", {
  id: int("id").autoincrement().primaryKey(),
  vendaId: int("vendaId").notNull(),
  externalProdutoId: varchar("externalProdutoId", { length: 100 }),
  produtoNome: varchar("produtoNome", { length: 255 }).notNull(),
  quantidade: decimal("quantidade", { precision: 10, scale: 3 }).notNull(),
  precoUnitario: decimal("precoUnitario", { precision: 10, scale: 2 }).notNull(),
  observacoes: text("observacoes"),
});

export type ItemVendaExterna = typeof itensVendaExterna.$inferSelect;
export type InsertItemVendaExterna = typeof itensVendaExterna.$inferInsert;

/**
 * Tabela de Mapeamento (A Pedra de Roseta)
 */
export const mapaProdutos = mysqlTable("mapa_produtos", {
  id: int("id").autoincrement().primaryKey(),
  externalProdutoId: varchar("externalProdutoId", { length: 100 }),
  externalProdutoNome: varchar("externalProdutoNome", { length: 255 }).notNull(),
  fichaTecnicaId: int("fichaTecnicaId"),
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MapaProduto = typeof mapaProdutos.$inferSelect;
export type InsertMapaProduto = typeof mapaProdutos.$inferInsert;
