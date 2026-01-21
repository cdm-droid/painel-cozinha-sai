import { describe, it, expect } from "vitest";

describe("Configuração Anota Aí", () => {
  it("deve ter as variáveis de ambiente configuradas", () => {
    // Verifica se as variáveis de ambiente estão definidas
    const apiUrl = process.env.ANOTA_AI_API_URL;
    const apiToken = process.env.ANOTA_AI_API_TOKEN;
    const storeId = process.env.ANOTA_AI_STORE_ID;

    expect(apiUrl).toBeDefined();
    expect(apiUrl).not.toBe("");
    expect(apiUrl).toContain("http");
    
    expect(apiToken).toBeDefined();
    expect(apiToken).not.toBe("");
    
    expect(storeId).toBeDefined();
    expect(storeId).not.toBe("");
  });

  it("a URL da API deve ser válida", () => {
    const apiUrl = process.env.ANOTA_AI_API_URL;
    
    // Verifica se é uma URL válida
    expect(() => new URL(apiUrl!)).not.toThrow();
  });
});
