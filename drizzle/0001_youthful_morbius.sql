CREATE TABLE `contagens_estoque` (
	`id` int AUTO_INCREMENT NOT NULL,
	`insumoId` int NOT NULL,
	`quantidadeContada` decimal(10,3) NOT NULL,
	`quantidadeAnterior` decimal(10,3),
	`diferenca` decimal(10,3),
	`visao` varchar(50),
	`userId` int,
	`observacao` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contagens_estoque_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `diario_producao` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fichaTecnicaId` int NOT NULL,
	`quantidadeProduzida` decimal(10,2) NOT NULL,
	`custoTotal` decimal(10,2),
	`observacao` text,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `diario_producao_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fichas_tecnicas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`codigo` varchar(50) NOT NULL,
	`produto` varchar(255) NOT NULL,
	`categoria` varchar(100),
	`rendimento` varchar(100),
	`custoTotal` decimal(10,2) NOT NULL DEFAULT '0',
	`precoVenda` decimal(10,2),
	`cmv` decimal(5,2),
	`markup` decimal(5,2),
	`codigoPdv` varchar(50),
	`nomePdv` varchar(255),
	`modoPreparo` text,
	`componentes` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fichas_tecnicas_id` PRIMARY KEY(`id`),
	CONSTRAINT `fichas_tecnicas_codigo_unique` UNIQUE(`codigo`)
);
--> statement-breakpoint
CREATE TABLE `insumos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`codigo` varchar(50) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`categoria` varchar(100) NOT NULL,
	`unidade` varchar(50) NOT NULL,
	`custoUnitario` decimal(10,2) NOT NULL DEFAULT '0',
	`estoqueAtual` decimal(10,3) NOT NULL DEFAULT '0',
	`estoqueMinimo` decimal(10,3) NOT NULL DEFAULT '0',
	`status` enum('OK','Baixo','Crítico') NOT NULL DEFAULT 'OK',
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `insumos_id` PRIMARY KEY(`id`),
	CONSTRAINT `insumos_codigo_unique` UNIQUE(`codigo`)
);
--> statement-breakpoint
CREATE TABLE `perdas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`insumoId` int NOT NULL,
	`quantidade` decimal(10,3) NOT NULL,
	`motivo` varchar(100) NOT NULL,
	`observacao` text,
	`custoPerda` decimal(10,2),
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `perdas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','operacional','gestor') NOT NULL DEFAULT 'user';