CREATE TABLE `itens_venda_externa` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vendaId` int NOT NULL,
	`externalProdutoId` varchar(100),
	`produtoNome` varchar(255) NOT NULL,
	`quantidade` decimal(10,3) NOT NULL,
	`precoUnitario` decimal(10,2) NOT NULL,
	`observacoes` text,
	CONSTRAINT `itens_venda_externa_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mapa_produtos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`externalProdutoId` varchar(100),
	`externalProdutoNome` varchar(255) NOT NULL,
	`fichaTecnicaId` int,
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mapa_produtos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vendas_externas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`externalId` varchar(100) NOT NULL,
	`origem` varchar(50) NOT NULL DEFAULT 'AnotaAi',
	`dataVenda` timestamp NOT NULL,
	`valorTotal` decimal(10,2) NOT NULL,
	`taxaEntrega` decimal(10,2) DEFAULT '0',
	`descontos` decimal(10,2) DEFAULT '0',
	`status` varchar(50) NOT NULL,
	`clienteNome` varchar(255),
	`jsonDados` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vendas_externas_id` PRIMARY KEY(`id`),
	CONSTRAINT `vendas_externas_externalId_unique` UNIQUE(`externalId`)
);
