CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`acao` varchar(100) NOT NULL,
	`detalhes` text,
	`criticidade` enum('normal','importante','critico') NOT NULL DEFAULT 'normal',
	`usuario` varchar(100),
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deveres` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` text,
	`secao` enum('abertura','durante_operacao','fechamento') NOT NULL,
	`horario` varchar(10),
	`ordem` int DEFAULT 0,
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `deveres_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deveres_concluidos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deverId` int NOT NULL,
	`dataReferencia` timestamp NOT NULL,
	`concluidoEm` timestamp NOT NULL DEFAULT (now()),
	`responsavel` varchar(100),
	`userId` int,
	CONSTRAINT `deveres_concluidos_id` PRIMARY KEY(`id`)
);
