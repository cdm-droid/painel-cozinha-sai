CREATE TABLE `colaboradores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`apelido` varchar(100),
	`cargo` varchar(100) NOT NULL,
	`funcao` enum('cozinheiro','auxiliar','chapeiro','atendente','gerente','outro') NOT NULL DEFAULT 'auxiliar',
	`telefone` varchar(20),
	`email` varchar(320),
	`dataAdmissao` timestamp,
	`turno` enum('manha','tarde','noite','integral') DEFAULT 'integral',
	`ativo` boolean NOT NULL DEFAULT true,
	`observacoes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `colaboradores_id` PRIMARY KEY(`id`)
);
