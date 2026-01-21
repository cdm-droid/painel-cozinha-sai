import axios from 'axios';

// ==========================================
// PREENCHA COM SEUS DADOS REAIS AQUI
// ==========================================
// URL CORRETA conforme documentação oficial: https://api-parceiros.anota.ai/partnerauth/ping/list
const API_URL_LISTA = "https://api-parceiros.anota.ai/partnerauth/ping/list";
const API_URL_ANTIGA = "https://api.anota.ai/v1/orders";
const API_URL_APP = "https://app.anota.ai/api/v1/orders";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RjN2MwNTM4Y2Y4ZjAwMTJiZmFmN2YiLCJpZHBhZ2UiOiI2N2RjN2MwNTU5NDUwNTAwMTkxZDgwMTEiLCJ0b2tlbmlkIjoiNjk0MWE4ZjQxZmZhM2Q4ZGRiYjNiODdhIiwiaWF0IjoxNzY5MDA4MjIxLCJhdWQiOiJhdXRoIiwiaXNzIjoic2Vzc2lvbi1hcGkifQ.yMsAXWP0H08pwyAsZeaUZk_qoBU79GDL10KKQAlLq4o";
const STORE_ID = "67dc7c0559450500191d8011";
// ==========================================

async function testarConexao(metodo, url, config) {
  console.log(`\n--- Testando: ${metodo} ---`);
  console.log(`URL: ${url}`);
  try {
    const response = await axios.get(url, { ...config, timeout: 10000 });
    console.log("✅ SUCESSO!");
    console.log("Status:", response.status);
    console.log("Dados:", JSON.stringify(response.data).substring(0, 300));
    return true;
  } catch (error) {
    console.log("❌ FALHA");
    if (error.response) {
      console.log(`Erro ${error.response.status}: ${error.response.statusText}`);
      const detail = typeof error.response.data === 'string' 
        ? error.response.data.substring(0, 200) 
        : JSON.stringify(error.response.data).substring(0, 200);
      console.log("Detalhe:", detail);
    } else {
      console.log("Erro:", error.message);
    }
    return false;
  }
}

async function diagnostico() {
  console.log("=".repeat(60));
  console.log("DIAGNÓSTICO COMPLETO - API ANOTA AÍ");
  console.log("=".repeat(60));
  console.log(`Token: ${TOKEN.substring(0, 50)}...`);
  console.log(`Store ID: ${STORE_ID}`);
  console.log("=".repeat(60));

  // TESTE 1: URL da documentação oficial (api-parceiros) - Token simples
  await testarConexao(
    "URL Oficial (api-parceiros) + Token Simples", 
    API_URL_LISTA,
    {
      headers: { 
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      },
      params: { excludeIfood: '1' }
    }
  );

  // TESTE 2: URL da documentação oficial (api-parceiros) - Bearer Token
  await testarConexao(
    "URL Oficial (api-parceiros) + Bearer Token", 
    API_URL_LISTA,
    {
      headers: { 
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: { excludeIfood: '1' }
    }
  );

  // TESTE 3: URL da documentação oficial + x-store-id header
  await testarConexao(
    "URL Oficial + x-store-id Header", 
    API_URL_LISTA,
    {
      headers: { 
        'Authorization': TOKEN,
        'x-store-id': STORE_ID,
        'Content-Type': 'application/json'
      },
      params: { excludeIfood: '1' }
    }
  );

  // TESTE 4: URL antiga (api.anota.ai) - para comparação
  await testarConexao(
    "URL Antiga (api.anota.ai) + Token", 
    API_URL_ANTIGA,
    {
      headers: { 'Authorization': TOKEN },
      params: { limit: 1, store_id: STORE_ID }
    }
  );

  // TESTE 5: URL app.anota.ai - alternativa
  await testarConexao(
    "URL App (app.anota.ai) + Token", 
    API_URL_APP,
    {
      headers: { 'Authorization': TOKEN },
      params: { limit: 1, store_id: STORE_ID }
    }
  );

  // TESTE 6: URL app.anota.ai + Bearer
  await testarConexao(
    "URL App (app.anota.ai) + Bearer Token", 
    API_URL_APP,
    {
      headers: { 'Authorization': `Bearer ${TOKEN}` },
      params: { limit: 1, store_id: STORE_ID }
    }
  );

  console.log("\n" + "=".repeat(60));
  console.log("DIAGNÓSTICO CONCLUÍDO");
  console.log("=".repeat(60));
}

diagnostico();
