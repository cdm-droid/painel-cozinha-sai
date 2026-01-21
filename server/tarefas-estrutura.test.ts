import { describe, it, expect } from "vitest";
import { getDb } from "./db";
import { deveres, colaboradores } from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";

describe("Estrutura de Tarefas - Novos Campos", () => {
  it("should connect to database", async () => {
    const db = await getDb();
    expect(db).toBeDefined();
  });

  it("should have deveres table with new fields (area, fatorPrincipal, responsavel, operadorId)", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Verificar que a tabela deveres existe e tem os novos campos
    const result = await db.execute(sql`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'deveres' 
      AND COLUMN_NAME IN ('area', 'fatorPrincipal', 'responsavel', 'operadorId')
    `);
    
    const columns = (result as any)[0].map((row: any) => row.COLUMN_NAME);
    
    expect(columns).toContain('area');
    expect(columns).toContain('fatorPrincipal');
    expect(columns).toContain('responsavel');
    expect(columns).toContain('operadorId');
  });

  it("should have colaboradores table", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Verificar que a tabela colaboradores existe
    const result = await db.execute(sql`
      SELECT COUNT(*) as count 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'colaboradores'
    `);
    
    const count = (result as any)[0][0].count;
    expect(count).toBeGreaterThan(0);
  });

  it("should allow creating a dever with new fields", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Criar um dever de teste com os novos campos
    const testDever = {
      titulo: "Teste de Tarefa com Novos Campos",
      descricao: "Tarefa criada para teste automatizado",
      categoria: "operacional" as const,
      area: "cozinha" as const,
      fatorPrincipal: "higiene" as const,
      responsavel: "gerente" as const,
      secao: "abertura" as const,
      recorrencia: "diaria" as const,
      ativo: true,
    };

    const result = await db.insert(deveres).values(testDever);
    const insertId = result[0].insertId;
    
    expect(insertId).toBeGreaterThan(0);

    // Verificar que o dever foi criado com os campos corretos
    const [deverCriado] = await db.select().from(deveres).where(eq(deveres.id, insertId));
    
    expect(deverCriado).toBeDefined();
    expect(deverCriado.area).toBe("cozinha");
    expect(deverCriado.fatorPrincipal).toBe("higiene");
    expect(deverCriado.responsavel).toBe("gerente");

    // Limpar: deletar o dever de teste
    await db.delete(deveres).where(eq(deveres.id, insertId));
  });
});
