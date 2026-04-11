CREATE TABLE `account` (
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
	CONSTRAINT `account_id` PRIMARY KEY(`id`),
	CONSTRAINT `provider_providerAccountId_idx` UNIQUE(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `mt5_account` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`accountId` varchar(255) NOT NULL,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `mt5_account_id` PRIMARY KEY(`id`),
	CONSTRAINT `userId_accountId_idx` UNIQUE(`userId`,`accountId`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_sessionToken_unique` UNIQUE(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
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
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification_token` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `verification_token_identifier_token_pk` PRIMARY KEY(`identifier`,`token`),
	CONSTRAINT `verification_token_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `bbs_bookmarks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(255) NOT NULL,
	`postId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `bbs_bookmarks_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_post_bookmark_idx` UNIQUE(`userId`,`postId`)
);
--> statement-breakpoint
CREATE TABLE `bbs_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`description` text,
	`sortOrder` int DEFAULT 0,
	`isVipOnly` boolean DEFAULT false,
	`requiredRole` enum('member','vip','moderator','admin') DEFAULT 'member',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `bbs_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `bbs_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `bbs_checkins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(255) NOT NULL,
	`checkinDate` date NOT NULL,
	`note` text,
	`streakDays` int DEFAULT 1,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `bbs_checkins_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_date_idx` UNIQUE(`userId`,`checkinDate`)
);
--> statement-breakpoint
CREATE TABLE `bbs_likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(255) NOT NULL,
	`postId` int,
	`replyId` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `bbs_likes_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_post_like_idx` UNIQUE(`userId`,`postId`),
	CONSTRAINT `user_reply_like_idx` UNIQUE(`userId`,`replyId`)
);
--> statement-breakpoint
CREATE TABLE `bbs_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`images` json,
	`viewCount` int DEFAULT 0,
	`isPinned` boolean DEFAULT false,
	`isDeleted` boolean DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `bbs_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bbs_replies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`isDeleted` boolean DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `bbs_replies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bbs_user_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(255) NOT NULL,
	`nickname` varchar(50),
	`signature` varchar(200),
	`bbsRole` enum('member','vip','moderator','admin') DEFAULT 'member',
	`postCount` int DEFAULT 0,
	`replyCount` int DEFAULT 0,
	`totalCheckins` int DEFAULT 0,
	`maxStreak` int DEFAULT 0,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `bbs_user_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `bbs_user_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mt5_account` ADD CONSTRAINT `mt5_account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_bookmarks` ADD CONSTRAINT `bbs_bookmarks_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_bookmarks` ADD CONSTRAINT `bbs_bookmarks_postId_bbs_posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `bbs_posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_checkins` ADD CONSTRAINT `bbs_checkins_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_likes` ADD CONSTRAINT `bbs_likes_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_likes` ADD CONSTRAINT `bbs_likes_postId_bbs_posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `bbs_posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_likes` ADD CONSTRAINT `bbs_likes_replyId_bbs_replies_id_fk` FOREIGN KEY (`replyId`) REFERENCES `bbs_replies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_posts` ADD CONSTRAINT `bbs_posts_categoryId_bbs_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `bbs_categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_posts` ADD CONSTRAINT `bbs_posts_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_replies` ADD CONSTRAINT `bbs_replies_postId_bbs_posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `bbs_posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_replies` ADD CONSTRAINT `bbs_replies_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bbs_user_profiles` ADD CONSTRAINT `bbs_user_profiles_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;