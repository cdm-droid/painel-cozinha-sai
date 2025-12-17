import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Dados dos insumos (extraídos do mock-data.ts)
const insumosData = [
  { codigo: "56601544", nome: "(IN) ACHOCOLATADO", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "30.9", status: "OK", ativo: true },
  { codigo: "89623228", nome: "(IN) Açúcar cristal", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "3.39", status: "OK", ativo: true },
  { codigo: "17849460", nome: "(IN) Creme de Leite", unidade: "L", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "3.69", status: "OK", ativo: true },
  { codigo: "21716329", nome: "(IN) Cupuaçu - polpa", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "22.09", status: "OK", ativo: true },
  { codigo: "44934463", nome: "(IN) Farinha de trigo", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "6.19", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Fermento químico", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "29.9", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Leite", unidade: "L", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "5.49", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Leite condensado", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "8.29, status: \"OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Manteiga", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "45.9", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Maracujá - polpa", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "22.09", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Morango - polpa", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "22.09", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Nescau", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "30.9", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Nutella", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "66.9", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Ovo", unidade: "Un", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "30", custoUnitario: "0.69", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Sal", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "5", custoUnitario: "2.49", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Sorvete", unidade: "L", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "15.9", status: "OK", ativo: true },
  { codigo: "68685168", nome: "(IN) Tapioca", unidade: "Kg", categoria: "Insumo", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "12.9", status: "OK", ativo: true },
  // Carnes
  { codigo: "CARNE001", nome: "Blend 180g", unidade: "Un", categoria: "Carnes", estoqueAtual: "0", estoqueMinimo: "50", custoUnitario: "6.50", status: "OK", ativo: true },
  { codigo: "CARNE002", nome: "Blend 90g", unidade: "Un", categoria: "Carnes", estoqueAtual: "0", estoqueMinimo: "50", custoUnitario: "3.25", status: "OK", ativo: true },
  { codigo: "CARNE003", nome: "Bacon", unidade: "Kg", categoria: "Carnes", estoqueAtual: "0", estoqueMinimo: "5", custoUnitario: "45.90", status: "OK", ativo: true },
  { codigo: "CARNE004", nome: "Linguiça Artesanal", unidade: "Kg", categoria: "Carnes", estoqueAtual: "0", estoqueMinimo: "5", custoUnitario: "32.90", status: "OK", ativo: true },
  // Pães
  { codigo: "PAO001", nome: "Pão Brioche", unidade: "Un", categoria: "Pães", estoqueAtual: "0", estoqueMinimo: "50", custoUnitario: "2.50", status: "OK", ativo: true },
  { codigo: "PAO002", nome: "Pão Australiano", unidade: "Un", categoria: "Pães", estoqueAtual: "0", estoqueMinimo: "30", custoUnitario: "3.20", status: "OK", ativo: true },
  // Queijos
  { codigo: "QUEIJO001", nome: "Queijo Cheddar", unidade: "Kg", categoria: "Queijos", estoqueAtual: "0", estoqueMinimo: "3", custoUnitario: "65.90", status: "OK", ativo: true },
  { codigo: "QUEIJO002", nome: "Queijo Mussarela", unidade: "Kg", categoria: "Queijos", estoqueAtual: "0", estoqueMinimo: "3", custoUnitario: "42.90", status: "OK", ativo: true },
  { codigo: "QUEIJO003", nome: "Queijo Prato", unidade: "Kg", categoria: "Queijos", estoqueAtual: "0", estoqueMinimo: "3", custoUnitario: "48.90", status: "OK", ativo: true },
  // Molhos
  { codigo: "MOLHO001", nome: "Maionese Artesanal", unidade: "L", categoria: "Molhos", estoqueAtual: "0", estoqueMinimo: "5", custoUnitario: "18.90", status: "OK", ativo: true },
  { codigo: "MOLHO002", nome: "Ketchup", unidade: "L", categoria: "Molhos", estoqueAtual: "0", estoqueMinimo: "5", custoUnitario: "12.90", status: "OK", ativo: true },
  { codigo: "MOLHO003", nome: "Mostarda", unidade: "L", categoria: "Molhos", estoqueAtual: "0", estoqueMinimo: "3", custoUnitario: "14.90", status: "OK", ativo: true },
  { codigo: "MOLHO004", nome: "Barbecue", unidade: "L", categoria: "Molhos", estoqueAtual: "0", estoqueMinimo: "3", custoUnitario: "16.90", status: "OK", ativo: true },
  // Vegetais
  { codigo: "VEG001", nome: "Alface Americana", unidade: "Un", categoria: "Vegetais", estoqueAtual: "0", estoqueMinimo: "10", custoUnitario: "4.50", status: "OK", ativo: true },
  { codigo: "VEG002", nome: "Tomate", unidade: "Kg", categoria: "Vegetais", estoqueAtual: "0", estoqueMinimo: "5", custoUnitario: "8.90", status: "OK", ativo: true },
  { codigo: "VEG003", nome: "Cebola Roxa", unidade: "Kg", categoria: "Vegetais", estoqueAtual: "0", estoqueMinimo: "3", custoUnitario: "7.90", status: "OK", ativo: true },
  { codigo: "VEG004", nome: "Picles", unidade: "Kg", categoria: "Vegetais", estoqueAtual: "0", estoqueMinimo: "2", custoUnitario: "22.90", status: "OK", ativo: true },
  // Bebidas
  { codigo: "BEB001", nome: "Coca-Cola Lata", unidade: "Un", categoria: "Bebidas", estoqueAtual: "0", estoqueMinimo: "48", custoUnitario: "3.50", status: "OK", ativo: true },
  { codigo: "BEB002", nome: "Guaraná Lata", unidade: "Un", categoria: "Bebidas", estoqueAtual: "0", estoqueMinimo: "24", custoUnitario: "3.20", status: "OK", ativo: true },
  { codigo: "BEB003", nome: "Água Mineral", unidade: "Un", categoria: "Bebidas", estoqueAtual: "0", estoqueMinimo: "24", custoUnitario: "2.00", status: "OK", ativo: true },
  // Embalagens
  { codigo: "EMB001", nome: "Caixa Hambúrguer", unidade: "Un", categoria: "Embalagens", estoqueAtual: "0", estoqueMinimo: "100", custoUnitario: "0.85", status: "OK", ativo: true },
  { codigo: "EMB002", nome: "Sacola Kraft", unidade: "Un", categoria: "Embalagens", estoqueAtual: "0", estoqueMinimo: "100", custoUnitario: "0.45", status: "OK", ativo: true },
  { codigo: "EMB003", nome: "Guardanapo", unidade: "Un", categoria: "Embalagens", estoqueAtual: "0", estoqueMinimo: "500", custoUnitario: "0.02", status: "OK", ativo: true },
];

async function seed() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  console.log("🌱 Iniciando seed do banco de dados...");

  // Inserir insumos
  console.log("📦 Inserindo insumos...");
  for (const insumo of insumosData) {
    try {
      await connection.execute(
        `INSERT INTO insumos (codigo, nome, unidade, categoria, estoque_atual, estoque_minimo, custo_unitario, status, ativo) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE nome = VALUES(nome)`,
        [insumo.codigo, insumo.nome, insumo.unidade, insumo.categoria, insumo.estoqueAtual, insumo.estoqueMinimo, insumo.custoUnitario, insumo.status, insumo.ativo]
      );
    } catch (err) {
      console.error(`Erro ao inserir ${insumo.nome}:`, err.message);
    }
  }

  console.log("✅ Seed concluído!");
  await connection.end();
}

seed().catch(console.error);
