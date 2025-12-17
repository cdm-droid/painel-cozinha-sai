# Painel Cozinha Saí - TODO

## Concluídos
- [x] Estrutura básica do sistema
- [x] Autenticação com níveis de acesso (Gestor/Operacional)
- [x] Página de Estoque Geral com filtros
- [x] Página de Estoque Crítico
- [x] Página de Fichas Técnicas
- [x] Página de Diário de Produção
- [x] Página de Perdas
- [x] Calculadora de receitas
- [x] Backend com banco de dados PostgreSQL
- [x] APIs TRPC para insumos e fichas técnicas
- [x] Aplicar identidade visual Saí Burguer
- [x] Importar fichas técnicas completas para o banco de dados (195 fichas)
- [x] Importar insumos completos para o banco de dados (105 insumos)
- [x] Atualizar página de Estoque Geral para usar backend TRPC
- [x] Atualizar página de Estoque Crítico para usar backend TRPC
- [x] Atualizar página de Fichas Técnicas para usar backend TRPC
- [x] Atualizar página de Diário de Produção para usar backend TRPC
- [x] Atualizar página de Perdas para usar backend TRPC
- [x] Testar persistência entre perfis (Gestor e Operacional)
- [x] Adicionar campos de produto, responsável e status no Diário de Produção
- [x] Criar testes automatizados para validar persistência

## Pendentes (Melhorias Futuras)
- [ ] Atualizar página Home (Dashboard) para usar dados reais do backend
- [ ] Implementar autenticação real com banco de dados
- [ ] Adicionar funcionalidade de backup/exportação
- [ ] Integração completa com Saipos PDV
- [ ] Relatórios de custos e CMV

## Concluído Recentemente
- [x] Dashboard com dados reais do banco de dados
  - [x] API para estatísticas de estoque crítico
  - [x] API para total de produções do dia
  - [x] API para custos e alertas
  - [x] Atualizar componente Home.tsx

## Concluído
- [x] Estoque de Contagem Diária no Painel Operacional
  - [x] Criar página com 8 itens específicos
  - [x] Blend 150g (mín 40), Blend 120g (mín 40)
  - [x] Batata palito (mín 8kg), Manteiga (mín 1kg)
  - [x] Queijo coalho (mín 1kg), Queijo prato (mín 120 fatias)
  - [x] Bacon fatiado (mín 1kg), Óleo fritura (mín 10L)
  - [x] Adicionar rota e menu de navegação

## Concluído
- [x] Histórico de Contagens Diárias
  - [x] Criar tabela no banco de dados
  - [x] APIs para salvar e listar contagens
  - [x] Visualização do histórico na página
  - [x] Resumo dos últimos 7 dias
