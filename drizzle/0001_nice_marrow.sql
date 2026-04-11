CREATE TABLE `activation_codes` (
	`id` varchar(255) NOT NULL,
	`code` varchar(50) NOT NULL,
	`durationDays` int NOT NULL DEFAULT 1095,
	`membershipLevel` int NOT NULL DEFAULT 1,
	`isUsed` boolean DEFAULT false,
	`usedByEmail` varchar(255),
	`usedById` varchar(255),
	`usedAt` datetime,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `activation_codes_id` PRIMARY KEY(`id`),
	CONSTRAINT `activation_codes_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
ALTER TABLE `activation_codes` ADD CONSTRAINT `activation_codes_usedById_user_id_fk` FOREIGN KEY (`usedById`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;