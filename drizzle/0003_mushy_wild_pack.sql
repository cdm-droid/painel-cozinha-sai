CREATE TABLE `contagens_diarias` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dataContagem` timestamp NOT NULL DEFAULT (now()),
	`itemNome` varchar(255) NOT NULL,
	`estoqueMinimo` decimal(10,2) NOT NULL,
	`estoqueContado` decimal(10,2) NOT NULL,
	`unidade` varchar(50) NOT NULL,
	`status` enum('OK','Baixo','Crítico') NOT NULL,
	`responsavel` varchar(100),
	`observacao` text,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contagens_diarias_id` PRIMARY KEY(`id`)
);
