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

## Concluído - Refinar Fichas Técnicas
- [x] Refinar fichas técnicas do sistema
  - [x] Ler documento original do Google Docs
  - [x] Adicionar modo de preparo profissional para 19 itens de Preparo
  - [x] Filtrar fichas do painel operacional (apenas categoria Preparo)
  - [x] Gestor continua vendo todas as fichas para gestão de custos

## Concluído - Integração Nova Interface v6.5
- [x] Integrar novo código React v6.5
  - [x] Adaptar estrutura de navegação (Gestor/Operador)
  - [x] Novo MainLayout com design industrial dark
  - [x] Dashboard diferenciado por perfil
  - [x] Página Calculadora Saî para escalonar preparos
  - [x] Página Checklist de Deveres
  - [x] Vincular ao banco de dados TRPC existente
  - [x] Criar tabela de audit_logs
  - [x] Criar tabela de deveres e deveres_concluidos

## Concluído - Reorganização Menu Estoque
- [x] Substituir "Insumos Críticos" por "Preparo" com destaque (badge "Novo")
- [x] Renomear "Estoque Geral" para "Estoque de Insumos"
- [x] Garantir Estoque Sensível busca do mesmo banco de insumos
- [x] Criar página de Preparo com filtros de categorias de produção

## Concluído - Vincular Estoque Sensível
- [x] Identificar códigos dos 8 insumos no banco
- [x] Atualizar ContagemDiaria com vínculos diretos por código

## Concluído - Kanban Unificado de Produção
- [x] Criar tabela de lotes de produção no banco
- [x] APIs TRPC para gerenciar lotes (criar, mover, finalizar)
- [x] Página Kanban com drag-and-drop
- [x] Colunas: Necessário → Em Produção → Pronto
- [x] Botão "Iniciar Produção" nos itens com estoque baixo
- [x] Atualização automática de estoque ao finalizar
- [x] Registro automático no Diário de Produção
- [x] 29 testes automatizados passando

## Concluído - Campo Contagem Diária Dinâmico
- [x] Adicionar campo contagemDiaria no schema de insumos
- [x] Atualizar página de Insumos do gestor com checkbox
- [x] Atualizar Contagem Diária para buscar itens marcados dinamicamente
- [x] 8 itens originais pré-marcados no banco

## Concluído - Calendário e Gestão de Tarefas
- [x] Calendário mensal no Quadro de Produção
  - [x] Visualização em calendário (30 dias)
  - [x] Agendamento de preparos com data futura
  - [x] Navegação entre meses
  - [x] Lotes agendados aparecem no dia correto
- [x] Gestão de Tarefas aprimorada (Gestor)
  - [x] CRUD completo de tarefas
  - [x] Recorrência: diária, semanal (dia específico), mensal, única
  - [x] Categorias: Operacional, Manutenção, Limpeza, Administrativo
  - [x] Seções: Abertura, Durante Operação, Fechamento
  - [x] Ativar/desativar tarefas
  - [x] 29 testes automatizados passando

## Concluído - Reestruturação Completa dos Painéis (Jan 2026)

### Painel Gestor
- [x] Unificar "Quadro de Produção" e "Diário de Produção" em página única
- [x] Seção "Estoque" (renomeada de "Insumos")
  - [x] Página Insumos: melhorar visualização, coluna "Qtde em Estoque"
  - [x] Filtros em uma linha, cabeçalho fixo
  - [x] Edição inline dos itens (clique na linha abre dialog)
  - [x] Integrar "Contagem Diária" para dentro de Estoque (aba Sensível)
  - [x] Estoque Sensível com quadros clicáveis (Críticos, Baixos, OK)
  - [x] Histórico com resumo em quadros e detalhes ao clicar na data
- [x] Atualizar navegação lateral com nova estrutura
- [x] Remover "Histórico" e "Contagem Diária" do menu lateral

### Painel Operacional
- [x] Quadro de Produção: botão para lote avulso (Novo Lote Avulso)
- [x] Estoque de Insumos: corrigir scroll horizontal
- [x] Renomear filtro "Estoque Crítico" para "Estoque Baixo"

### Pendentes
- [ ] Criar página "Equipe" para cadastro de colaboradores
  - [ ] Banco de dados: nome, cargo, função, dados pertinentes
  - [ ] Vincular colaboradores às produções e tarefas

## Concluído - Melhorias Estoque e Produção (Jan 2026)

- [x] Adicionar aba "Estoque Geral" na seção Estoque do Gestor
- [x] Adicionar aba "Preparos" na seção Estoque do Gestor (vinculada ao banco de dados do painel operacional)
- [x] Mostrar itens com estoque baixo no quadro "Necessários" da Produção Gestor
- [x] Unificar banco de dados de tarefas entre Gestão de Tarefas (Gestor) e Deveres (Operacional)

## Concluído - Unificação Fichas Técnicas (Jan 2026)

- [x] Analisar estrutura atual das fichas técnicas nos dois painéis
- [x] Adicionar campo de visibilidade (visivelOperacional) no schema de fichas técnicas
- [x] Atualizar página de Fichas Técnicas do Gestor com botão de marcação (Switch)
- [x] Atualizar página de Fichas Técnicas do Operacional para usar o mesmo banco de dados
- [x] Filtrar fichas no painel operacional baseado no campo de visibilidade
