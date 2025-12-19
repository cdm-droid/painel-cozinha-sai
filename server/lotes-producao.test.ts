import { describe, it, expect, beforeAll, afterAll } from "vitest";

const BASE_URL = "http://localhost:3000/api/trpc";

describe("Lotes de Produção Router", () => {
  let createdLoteId: number | null = null;

  it("deve listar lotes de produção", async () => {
    const response = await fetch(`${BASE_URL}/lotesProducao.list`);
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.result.data.json).toBeDefined();
    expect(Array.isArray(data.result.data.json)).toBe(true);
  });

  it("deve listar itens necessários (estoque baixo)", async () => {
    const response = await fetch(`${BASE_URL}/lotesProducao.itensNecessarios`);
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.result.data.json).toBeDefined();
    expect(Array.isArray(data.result.data.json)).toBe(true);
  });

  it("deve criar um novo lote de produção", async () => {
    const response = await fetch(`${BASE_URL}/lotesProducao.create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        json: {
          insumoId: 1,
          insumoNome: "(PR) Teste Lote",
          insumoUnidade: "Kg",
          quantidadePlanejada: "5.0",
          responsavel: "Teste",
        },
      }),
    });
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.result.data.json.success).toBe(true);
    expect(data.result.data.json.id).toBeDefined();
    createdLoteId = data.result.data.json.id;
  });

  it("deve iniciar produção de um lote", async () => {
    if (!createdLoteId) return;
    
    const response = await fetch(`${BASE_URL}/lotesProducao.iniciarProducao`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        json: {
          id: createdLoteId,
          responsavel: "Operador Teste",
        },
      }),
    });
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.result.data.json.success).toBe(true);
  });

  it("deve marcar lote como pronto", async () => {
    if (!createdLoteId) return;
    
    const response = await fetch(`${BASE_URL}/lotesProducao.marcarPronto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        json: {
          id: createdLoteId,
          quantidadeProduzida: "4.5",
        },
      }),
    });
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.result.data.json.success).toBe(true);
  });

  it("deve excluir lote não finalizado", async () => {
    if (!createdLoteId) return;
    
    const response = await fetch(`${BASE_URL}/lotesProducao.delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        json: createdLoteId,
      }),
    });
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.result.data.json.success).toBe(true);
  });
});
