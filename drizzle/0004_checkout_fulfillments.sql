-- Idempotency for Stripe checkouts after license codes stopped being issued.
-- This table does not store a customer license code.
-- activation_codes is left in place for history. Do not drop it.
-- Run once on the site database (hPanel → Databases → phpMyAdmin) before the
-- updated webhook is deployed. Safe to run again.
-- Plain equivalent, if PREPARE is disabled and the foreign key is missing:
--   ALTER TABLE `checkout_fulfillments` ADD CONSTRAINT `checkout_fulfillments_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

CREATE TABLE IF NOT EXISTS `checkout_fulfillments` (
  `id` varchar(255) NOT NULL,
  `stripeSessionId` varchar(255) NOT NULL,
  `planId` varchar(8) NOT NULL,
  `membershipLevel` int NOT NULL,
  `durationDays` int NOT NULL,
  `email` varchar(255) NULL,
  `userId` varchar(255) NULL,
  `purchasedAt` datetime NOT NULL,
  `appliedAt` datetime NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `checkout_fulfillments_stripeSessionId_unique` (`stripeSessionId`)
);

SET @db := DATABASE();

SET @sql := (
  SELECT IF(
    EXISTS(
      SELECT 1 FROM information_schema.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = @db
        AND TABLE_NAME = 'checkout_fulfillments'
        AND CONSTRAINT_NAME = 'checkout_fulfillments_userId_user_id_fk'
    ),
    'SELECT 1',
    'ALTER TABLE `checkout_fulfillments` ADD CONSTRAINT `checkout_fulfillments_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
