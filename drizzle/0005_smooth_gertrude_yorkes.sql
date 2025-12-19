CREATE TABLE `lotes_producao` (
	`id` int AUTO_INCREMENT NOT NULL,
	`insumoId` int NOT NULL,
	`insumoNome` varchar(255) NOT NULL,
	`insumoUnidade` varchar(50) NOT NULL,
	`quantidadePlanejada` decimal(10,3) NOT NULL,
	`quantidadeProduzida` decimal(10,3) DEFAULT '0',
	`status` enum('necessario','em_producao','pronto','finalizado') NOT NULL DEFAULT 'necessario',
	`responsavel` varchar(100),
	`userId` int,
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	`iniciadoEm` timestamp,
	`prontoEm` timestamp,
	`finalizadoEm` timestamp,
	`observacao` text,
	CONSTRAINT `lotes_producao_id` PRIMARY KEY(`id`)
);
