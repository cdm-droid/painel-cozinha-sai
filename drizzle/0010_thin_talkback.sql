ALTER TABLE `deveres` ADD `area` enum('cozinha','caixa','area_externa','salao','estoque','geral') DEFAULT 'geral';--> statement-breakpoint
ALTER TABLE `deveres` ADD `fatorPrincipal` enum('seguranca','higiene','manutencao','operacional','qualidade','outro') DEFAULT 'operacional';--> statement-breakpoint
ALTER TABLE `deveres` ADD `responsavel` enum('gerente','chapeiro','auxiliar_cozinha','atendente','cozinheiro','todos') DEFAULT 'todos';--> statement-breakpoint
ALTER TABLE `deveres` ADD `operadorId` int;