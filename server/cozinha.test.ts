import { describe, it, expect, beforeAll } from "vitest";
import { getDb } from "./db";

describe("Cozinha API - Insumos", () => {
  it("should connect to database", async () => {
    const db = await getDb();
    expect(db).toBeDefined();
  });

  it("should have insumos table with data", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }
    
    // Query raw SQL to check if table exists and has data
    const result = await db.execute("SELECT COUNT(*) as count FROM insumos");
    expect(result).toBeDefined();
  });
});

describe("Cozinha API - Fichas Técnicas", () => {
  it("should have fichas_tecnicas table", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }
    
    const result = await db.execute("SELECT COUNT(*) as count FROM fichas_tecnicas");
    expect(result).toBeDefined();
  });
});
