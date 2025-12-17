import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

describe('Dashboard API - Estatísticas', () => {
  let conn: mysql.Connection;

  beforeAll(async () => {
    conn = await mysql.createConnection(process.env.DATABASE_URL!);
  });

  afterAll(async () => {
    await conn.end();
  });

  it('deve retornar contagem de insumos', async () => {
    const [result] = await conn.query('SELECT COUNT(*) as total FROM insumos');
    const total = (result as any[])[0].total;
    
    expect(total).toBeGreaterThan(0);
    console.log(`Total de insumos: ${total}`);
  });

  it('deve retornar contagem de insumos críticos', async () => {
    const [result] = await conn.query("SELECT COUNT(*) as total FROM insumos WHERE status = 'Crítico'");
    const total = (result as any[])[0].total;
    
    expect(total).toBeGreaterThanOrEqual(0);
    console.log(`Insumos críticos: ${total}`);
  });

  it('deve retornar contagem de insumos baixos', async () => {
    const [result] = await conn.query("SELECT COUNT(*) as total FROM insumos WHERE status = 'Baixo'");
    const total = (result as any[])[0].total;
    
    expect(total).toBeGreaterThanOrEqual(0);
    console.log(`Insumos baixos: ${total}`);
  });

  it('deve retornar contagem de fichas técnicas', async () => {
    const [result] = await conn.query('SELECT COUNT(*) as total FROM fichas_tecnicas');
    const total = (result as any[])[0].total;
    
    expect(total).toBeGreaterThan(0);
    console.log(`Total de fichas técnicas: ${total}`);
  });

  it('deve retornar alertas de estoque (crítico + baixo)', async () => {
    const [result] = await conn.query(`
      SELECT id, nome, estoqueAtual, estoqueMinimo, unidade, status 
      FROM insumos 
      WHERE status IN ('Crítico', 'Baixo') 
      ORDER BY status, nome 
      LIMIT 10
    `);
    
    const alertas = result as any[];
    console.log(`Alertas encontrados: ${alertas.length}`);
    
    // Cada alerta deve ter os campos necessários
    alertas.forEach(alerta => {
      expect(alerta).toHaveProperty('nome');
      expect(alerta).toHaveProperty('estoqueAtual');
      expect(alerta).toHaveProperty('status');
    });
  });

  it('deve retornar produções recentes', async () => {
    const [result] = await conn.query(`
      SELECT * FROM diario_producao 
      ORDER BY createdAt DESC 
      LIMIT 5
    `);
    
    const producoes = result as any[];
    console.log(`Produções recentes: ${producoes.length}`);
    
    // Verificar estrutura se houver produções
    if (producoes.length > 0) {
      expect(producoes[0]).toHaveProperty('produto');
      expect(producoes[0]).toHaveProperty('quantidadeProduzida');
    }
  });
});
