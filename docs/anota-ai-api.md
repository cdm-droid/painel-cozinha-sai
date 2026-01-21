# Documentação API Anota Aí - Consulta de Pedidos

## Endpoint Correto
- **URL**: `https://api-parceiros.anota.ai/partnerauth/ping/list`
- **Método**: GET

## Headers Necessários
- **Authorization**: `{token}` (obrigatório)
- **Content-Type**: `application/json`

## Query Parameters
- **excludeIfood**: string (default: 1) - Não exibir pedidos de origem iFood
- **groupOrdersByTable**: string (exemplo: 1) - Agrupar pedidos de mesa

## Exemplo de Request (cURL)
```bash
curl --request GET \
  --url https://api-parceiros.anota.ai/partnerauth/ping/list \
  --header 'Accept: application/json' \
  --header 'Authorization: {token}' \
  --header 'Content-Type: application/json'
```

## Resposta de Sucesso (200)
```json
{
  "success": true,
  "info": {
    "docs": [
      {
        "_id": "6663408acdf7e100124f5731",
        "check": 3,
        "from": "site",
        "salesChannel": "anotaai",
        "updatedAt": "2024-06-07T17:17:32.545Z"
      }
    ],
    "count": 1,
    "limit": 100,
    "currentpage": 1
  }
}
```

## Problemas Identificados na Integração Atual
1. URL incorreta: estava usando `https://api.anota.ai/v1/orders` ao invés de `https://api-parceiros.anota.ai/partnerauth/ping/list`
2. Header Authorization: deve ser apenas o token, sem prefixo "Bearer"
