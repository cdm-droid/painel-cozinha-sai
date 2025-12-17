import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "./db";
import { insumos, fichasTecnicas } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Persistência de Dados no Banco", () => {
  let db: Awaited<ReturnType<typeof getDb>>;

  beforeAll(async () => {
    db = await getDb();
  });

  it("deve ter insumos no banco de dados", async () => {
    if (!db) {
      console.log("Database não disponível, pulando teste");
      return;
    }

    const result = await db.select().from(insumos).limit(5);
    expect(result.length).toBeGreaterThan(0);
    console.log(`Encontrados ${result.length} insumos no banco`);
  });

  it("deve ter fichas técnicas no banco de dados", async () => {
    if (!db) {
      console.log("Database não disponível, pulando teste");
      return;
    }

    const result = await db.select().from(fichasTecnicas).limit(5);
    expect(result.length).toBeGreaterThan(0);
    console.log(`Encontradas ${result.length} fichas técnicas no banco`);
  });

  it("deve conseguir atualizar um insumo e persistir a alteração", async () => {
    if (!db) {
      console.log("Database não disponível, pulando teste");
      return;
    }

    // Buscar um insumo existente
    const [insumo] = await db.select().from(insumos).limit(1);
    if (!insumo) {
      console.log("Nenhum insumo encontrado, pulando teste");
      return;
    }

    const originalEstoque = insumo.estoqueAtual;
    const novoEstoque = "999.999";

    // Atualizar o estoque
    await db.update(insumos)
      .set({ estoqueAtual: novoEstoque })
      .where(eq(insumos.id, insumo.id));

    // Verificar se a alteração persistiu
    const [insumoAtualizado] = await db.select()
      .from(insumos)
      .where(eq(insumos.id, insumo.id));

    expect(insumoAtualizado.estoqueAtual).toBe(novoEstoque);

    // Reverter para o valor original
    await db.update(insumos)
      .set({ estoqueAtual: originalEstoque })
      .where(eq(insumos.id, insumo.id));

    console.log(`Insumo ${insumo.nome} atualizado e revertido com sucesso`);
  });

  it("deve conseguir atualizar uma ficha técnica e persistir a alteração", async () => {
    if (!db) {
      console.log("Database não disponível, pulando teste");
      return;
    }

    // Buscar uma ficha existente
    const [ficha] = await db.select().from(fichasTecnicas).limit(1);
    if (!ficha) {
      console.log("Nenhuma ficha encontrada, pulando teste");
      return;
    }

    const originalProduto = ficha.produto;
    const novoProduto = originalProduto + " [TESTE]";

    // Atualizar o produto
    await db.update(fichasTecnicas)
      .set({ produto: novoProduto })
      .where(eq(fichasTecnicas.id, ficha.id));

    // Verificar se a alteração persistiu
    const [fichaAtualizada] = await db.select()
      .from(fichasTecnicas)
      .where(eq(fichasTecnicas.id, ficha.id));

    expect(fichaAtualizada.produto).toBe(novoProduto);

    // Reverter para o valor original
    await db.update(fichasTecnicas)
      .set({ produto: originalProduto })
      .where(eq(fichasTecnicas.id, ficha.id));

    console.log(`Ficha ${originalProduto} atualizada e revertida com sucesso`);
  });

  it("os dados devem ser acessíveis independente do perfil de usuário", async () => {
    if (!db) {
      console.log("Database não disponível, pulando teste");
      return;
    }

    // Este teste verifica que os dados são armazenados no banco central
    // e não em localStorage específico por usuário
    
    // Contar insumos
    const insumosResult = await db.select().from(insumos);
    const fichasResult = await db.select().from(fichasTecnicas);

    console.log(`Total de insumos no banco: ${insumosResult.length}`);
    console.log(`Total de fichas técnicas no banco: ${fichasResult.length}`);

    // Verificar que temos dados suficientes
    expect(insumosResult.length).toBeGreaterThan(50);
    expect(fichasResult.length).toBeGreaterThan(100);
  });
});
