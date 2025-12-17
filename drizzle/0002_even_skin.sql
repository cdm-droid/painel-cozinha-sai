ALTER TABLE `diario_producao` MODIFY COLUMN `fichaTecnicaId` int;--> statement-breakpoint
ALTER TABLE `diario_producao` ADD `produto` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `diario_producao` ADD `unidade` varchar(50) DEFAULT 'un';--> statement-breakpoint
ALTER TABLE `diario_producao` ADD `responsavel` varchar(100);--> statement-breakpoint
ALTER TABLE `diario_producao` ADD `statusProducao` enum('Planejado','Em Produção','Concluído') DEFAULT 'Planejado' NOT NULL;