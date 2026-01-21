import { describe, it, expect } from "vitest";
import { getDb } from "./db";
import { fichasTecnicas } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Fichas Técnicas - Visibilidade Operacional", () => {
  it("should connect to database", async () => {
    const db = await getDb();
    expect(db).toBeDefined();
  });

  it("should have visivelOperacional field in fichas_tecnicas table", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Buscar todas as fichas
    const fichas = await db.select().from(fichasTecnicas).limit(5);
    
    // Verificar se o campo visivelOperacional existe
    if (fichas.length > 0) {
      expect(fichas[0]).toHaveProperty("visivelOperacional");
      expect(typeof fichas[0].visivelOperacional).toBe("boolean");
    }
  });

  it("should be able to filter fichas by visivelOperacional", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Buscar fichas visíveis no operacional
    const fichasVisiveis = await db.select()
      .from(fichasTecnicas)
      .where(eq(fichasTecnicas.visivelOperacional, true));
    
    // Buscar fichas não visíveis
    const fichasNaoVisiveis = await db.select()
      .from(fichasTecnicas)
      .where(eq(fichasTecnicas.visivelOperacional, false));
    
    // Verificar que a consulta funciona (pode ter 0 ou mais resultados)
    expect(Array.isArray(fichasVisiveis)).toBe(true);
    expect(Array.isArray(fichasNaoVisiveis)).toBe(true);
  });

  it("should be able to toggle visivelOperacional field", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Buscar uma ficha para teste
    const [ficha] = await db.select().from(fichasTecnicas).limit(1);
    
    if (ficha) {
      const valorOriginal = ficha.visivelOperacional;
      
      // Alterar o valor
      await db.update(fichasTecnicas)
        .set({ visivelOperacional: !valorOriginal })
        .where(eq(fichasTecnicas.id, ficha.id));
      
      // Verificar a alteração
      const [fichaAtualizada] = await db.select()
        .from(fichasTecnicas)
        .where(eq(fichasTecnicas.id, ficha.id));
      
      expect(fichaAtualizada.visivelOperacional).toBe(!valorOriginal);
      
      // Restaurar valor original
      await db.update(fichasTecnicas)
        .set({ visivelOperacional: valorOriginal })
        .where(eq(fichasTecnicas.id, ficha.id));
    }
  });
});
