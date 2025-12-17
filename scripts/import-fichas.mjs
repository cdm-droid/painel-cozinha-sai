// Script para importar fichas técnicas do mock-data.ts para o banco de dados
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ler o arquivo mock-data.ts e extrair as fichas técnicas
const mockDataPath = path.join(__dirname, '..', 'client', 'src', 'lib', 'mock-data.ts');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');

// Extrair o array de fichas técnicas usando regex
const fichasMatch = mockDataContent.match(/export const fichasTecnicas[^=]*=\s*(\[[\s\S]*?\]);?\s*$/m);

if (!fichasMatch) {
  console.error('Não foi possível encontrar as fichas técnicas no arquivo');
  process.exit(1);
}

// Avaliar o array (cuidado: isso é seguro apenas para dados confiáveis)
let fichas;
try {
  // Limpar o conteúdo para ser JSON válido
  let jsonStr = fichasMatch[1];
  // Remover trailing commas
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
  // Converter para JSON válido
  fichas = eval(`(${jsonStr})`);
} catch (e) {
  console.error('Erro ao parsear fichas técnicas:', e.message);
  process.exit(1);
}

console.log(`Encontradas ${fichas.length} fichas técnicas para importar`);

async function importFichas() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    // Limpar tabela existente
    await connection.execute('DELETE FROM fichas_tecnicas');
    console.log('Tabela fichas_tecnicas limpa');
    
    let imported = 0;
    let errors = 0;
    
    for (const ficha of fichas) {
      try {
        const componentes = JSON.stringify(ficha.componentes || []);
        
        await connection.execute(
          `INSERT INTO fichas_tecnicas 
           (codigo, produto, categoria, rendimento, custo_total, preco_venda, cmv, markup, codigo_pdv, nome_pdv, modo_preparo, componentes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            `FT-${ficha.id}`,
            ficha.produto,
            'Geral',
            ficha.rendimentoBase?.toString() || '1',
            ficha.custoTotal?.toString() || '0',
            ficha.precoVenda?.toString() || '0',
            ficha.cmv?.toString() || '0',
            ficha.markup?.toString() || '0',
            ficha.pdvId || null,
            ficha.nomeOnline || null,
            ficha.modoPreparo || '',
            componentes
          ]
        );
        imported++;
        
        if (imported % 20 === 0) {
          console.log(`Importadas ${imported} fichas...`);
        }
      } catch (err) {
        console.error(`Erro ao importar ficha ${ficha.produto}:`, err.message);
        errors++;
      }
    }
    
    console.log(`\nImportação concluída!`);
    console.log(`- Fichas importadas: ${imported}`);
    console.log(`- Erros: ${errors}`);
    
  } finally {
    await connection.end();
  }
}

importFichas().catch(console.error);
