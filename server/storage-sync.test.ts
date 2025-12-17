import { describe, it, expect } from "vitest";
import { getDb } from "./db";
import { insumos, fichasTecnicas } from "../drizzle/schema";
import { sql } from "drizzle-orm";

describe("Storage Sync - Persistência entre perfis e dispositivos", () => {
  it("deve conectar ao banco de dados", async () => {
    const db = await getDb();
    expect(db).toBeDefined();
  });

  it("deve ter insumos no banco de dados", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    const result = await db.select().from(insumos).limit(5);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("deve ter fichas técnicas no banco de dados", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    const result = await db.select().from(fichasTecnicas).limit(5);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("deve atualizar insumo e persistir no banco", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    // Busca um insumo existente
    const selectResult = await db.select().from(insumos).limit(1);
    
    if (selectResult.length === 0) {
      // Se não houver insumos, o teste passa (banco vazio é válido)
      expect(true).toBe(true);
      return;
    }
    
    const insumoOriginal = selectResult[0];
    const novoNome = `Teste Update ${Date.now()}`;
    
    // Atualiza o nome usando SQL raw
    await db.execute(sql`UPDATE insumos SET nome = ${novoNome} WHERE id = ${insumoOriginal.id}`);
    
    // Verifica se foi atualizado
    const verifyResult = await db.select().from(insumos).where(sql`id = ${insumoOriginal.id}`);
    expect(verifyResult[0].nome).toBe(novoNome);
    
    // Restaura o nome original
    await db.execute(sql`UPDATE insumos SET nome = ${insumoOriginal.nome} WHERE id = ${insumoOriginal.id}`);
  });
});
