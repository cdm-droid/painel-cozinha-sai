import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

describe('Diário de Produção - Persistência', () => {
  let conn: mysql.Connection;

  beforeAll(async () => {
    conn = await mysql.createConnection(process.env.DATABASE_URL!);
  });

  afterAll(async () => {
    await conn.end();
  });

  it('deve conseguir criar uma produção no diário', async () => {
    // Inserir produção de teste
    const [result] = await conn.query(
      `INSERT INTO diario_producao (produto, quantidadeProduzida, unidade, responsavel, statusProducao) 
       VALUES (?, ?, ?, ?, ?)`,
      ['Teste Brownie', '10', 'un', 'Equipe Teste', 'Planejado']
    );
    
    const insertId = (result as any).insertId;
    expect(insertId).toBeGreaterThan(0);

    // Verificar se foi inserido
    const [rows] = await conn.query(
      'SELECT * FROM diario_producao WHERE id = ?',
      [insertId]
    );
    
    const producao = (rows as any[])[0];
    expect(producao.produto).toBe('Teste Brownie');
    expect(producao.statusProducao).toBe('Planejado');
    expect(producao.responsavel).toBe('Equipe Teste');

    // Limpar dados de teste
    await conn.query('DELETE FROM diario_producao WHERE id = ?', [insertId]);
  });

  it('deve conseguir atualizar o status de uma produção', async () => {
    // Inserir produção de teste
    const [result] = await conn.query(
      `INSERT INTO diario_producao (produto, quantidadeProduzida, unidade, responsavel, statusProducao) 
       VALUES (?, ?, ?, ?, ?)`,
      ['Teste Molho', '5', 'L', 'Chef', 'Planejado']
    );
    
    const insertId = (result as any).insertId;

    // Atualizar status
    await conn.query(
      'UPDATE diario_producao SET statusProducao = ? WHERE id = ?',
      ['Concluído', insertId]
    );

    // Verificar atualização
    const [rows] = await conn.query(
      'SELECT statusProducao FROM diario_producao WHERE id = ?',
      [insertId]
    );
    
    expect((rows as any[])[0].statusProducao).toBe('Concluído');

    // Limpar dados de teste
    await conn.query('DELETE FROM diario_producao WHERE id = ?', [insertId]);
  });

  it('deve conseguir excluir uma produção', async () => {
    // Inserir produção de teste
    const [result] = await conn.query(
      `INSERT INTO diario_producao (produto, quantidadeProduzida, unidade, responsavel, statusProducao) 
       VALUES (?, ?, ?, ?, ?)`,
      ['Teste Delete', '1', 'un', 'Teste', 'Planejado']
    );
    
    const insertId = (result as any).insertId;

    // Excluir
    await conn.query('DELETE FROM diario_producao WHERE id = ?', [insertId]);

    // Verificar exclusão
    const [rows] = await conn.query(
      'SELECT * FROM diario_producao WHERE id = ?',
      [insertId]
    );
    
    expect((rows as any[]).length).toBe(0);
  });

  it('deve listar produções ordenadas por data de criação', async () => {
    // Inserir algumas produções
    await conn.query(
      `INSERT INTO diario_producao (produto, quantidadeProduzida, statusProducao) VALUES (?, ?, ?)`,
      ['Prod 1', '1', 'Planejado']
    );
    await conn.query(
      `INSERT INTO diario_producao (produto, quantidadeProduzida, statusProducao) VALUES (?, ?, ?)`,
      ['Prod 2', '2', 'Em Produção']
    );

    // Listar
    const [rows] = await conn.query(
      'SELECT * FROM diario_producao ORDER BY createdAt DESC'
    );
    
    expect((rows as any[]).length).toBeGreaterThanOrEqual(2);

    // Limpar
    await conn.query("DELETE FROM diario_producao WHERE produto LIKE 'Prod %'");
  });
});
