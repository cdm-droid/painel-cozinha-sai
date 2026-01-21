import axios from 'axios';

// ==========================================
// PREENCHA COM SEUS DADOS REAIS AQUI
// ==========================================
const API_URL = "https://api.anota.ai/v1/orders";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RjN2MwNTM4Y2Y4ZjAwMTJiZmFmN2YiLCJpZHBhZ2UiOiI2N2RjN2MwNTU5NDUwNTAwMTkxZDgwMTEiLCJ0b2tlbmlkIjoiNjk0MWE4ZjQxZmZhM2Q4ZGRiYjNiODdhIiwiaWF0IjoxNzY5MDA4MjIxLCJhdWQiOiJhdXRoIiwiaXNzIjoic2Vzc2lvbi1hcGkifQ.yMsAXWP0H08pwyAsZeaUZk_qoBU79GDL10KKQAlLq4o"; // Coloque sua chave entre aspas
const STORE_ID = "67dc7c0559450500191d8011"; // Coloque o ID da loja
// ==========================================

async function testarConexao(metodo, config) {
  console.log(`\n--- Testando Método: ${metodo} ---`);
  try {
    const response = await axios.get(API_URL, config);
    console.log("✅ SUCESSO!");
    console.log("Status:", response.status);
    console.log("Dados recebidos:", response.data ? "Sim (JSON)" : "Vazio");
    if (response.data && response.data.orders) {
        console.log(`Pedidos encontrados: ${response.data.orders.length}`);
    }
    return true;
  } catch (error) {
    console.log("❌ FALHA");
    if (error.response) {
      console.log(`Erro ${error.response.status}: ${error.response.statusText}`);
      console.log("Detalhe:", JSON.stringify(error.response.data));
    } else {
      console.log("Erro:", error.message);
    }
    return false;
  }
}

async function diagnostico() {
  console.log("Iniciando diagnóstico Anota Aí...");

  // TENTATIVA 1: Token direto no Header (O que estamos usando agora)
  await testarConexao("Token Simples", {
    headers: { 'Authorization': TOKEN },
    params: { limit: 1, store_id: STORE_ID }
  });

  // TENTATIVA 2: Token com prefixo 'Bearer' (Padrão de mercado)
  await testarConexao("Bearer Token", {
    headers: { 'Authorization': `Bearer ${TOKEN}` },
    params: { limit: 1, store_id: STORE_ID }
  });

  // TENTATIVA 3: ID da Loja no Header (Algumas APIs exigem isso)
  await testarConexao("Store ID no Header", {
    headers: { 
      'Authorization': TOKEN,
      'x-store-id': STORE_ID
    },
    params: { limit: 1 }
  });

   // TENTATIVA 4: API Key no Header customizado
   await testarConexao("X-API-KEY", {
    headers: { 
      'x-api-key': TOKEN,
    },
    params: { limit: 1, store_id: STORE_ID }
  });
}

diagnostico();
