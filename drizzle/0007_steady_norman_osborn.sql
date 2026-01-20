ALTER TABLE `deveres` ADD `categoria` enum('operacional','manutencao','limpeza','administrativo') DEFAULT 'operacional' NOT NULL;--> statement-breakpoint
ALTER TABLE `deveres` ADD `recorrencia` enum('diaria','semanal','mensal','unica') DEFAULT 'diaria' NOT NULL;--> statement-breakpoint
ALTER TABLE `deveres` ADD `diaSemana` int;--> statement-breakpoint
ALTER TABLE `deveres` ADD `diaMes` int;--> statement-breakpoint
ALTER TABLE `deveres` ADD `dataEspecifica` timestamp;--> statement-breakpoint
ALTER TABLE `lotes_producao` ADD `dataAgendada` timestamp DEFAULT (now()) NOT NULL;