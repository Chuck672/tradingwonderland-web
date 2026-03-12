CREATE TABLE `Account` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `Account_id` PRIMARY KEY(`id`),
	CONSTRAINT `provider_providerAccountId_idx` UNIQUE(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `Mt5Account` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`accountId` varchar(255) NOT NULL,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `Mt5Account_id` PRIMARY KEY(`id`),
	CONSTRAINT `userId_accountId_idx` UNIQUE(`userId`,`accountId`)
);
--> statement-breakpoint
CREATE TABLE `Session` (
	`id` varchar(255) NOT NULL,
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `Session_id` PRIMARY KEY(`id`),
	CONSTRAINT `Session_sessionToken_unique` UNIQUE(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`emailVerified` datetime,
	`image` varchar(255),
	`password` varchar(255),
	`membershipLevel` int DEFAULT 0,
	`vipUntil` datetime,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `VerificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `VerificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`),
	CONSTRAINT `VerificationToken_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Mt5Account` ADD CONSTRAINT `Mt5Account_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;