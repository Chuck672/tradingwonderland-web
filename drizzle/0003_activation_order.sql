-- Bind Stripe Checkout sessions to activation codes.
-- Run once on the site database (hPanel → Databases → phpMyAdmin).
-- Safe to run again: each step no-ops when the column or key already exists.
-- Plain equivalents, if PREPARE is disabled:
--   ALTER TABLE `activation_codes` ADD `ownerUserId` varchar(255) NULL;
--   ALTER TABLE `activation_codes` ADD `stripeSessionId` varchar(255) NULL;
--   ALTER TABLE `activation_codes` ADD `planId` varchar(8) NULL;
--   ALTER TABLE `activation_codes` ADD CONSTRAINT `activation_codes_stripeSessionId_unique` UNIQUE (`stripeSessionId`);
--   ALTER TABLE `activation_codes` ADD CONSTRAINT `activation_codes_ownerUserId_user_id_fk` FOREIGN KEY (`ownerUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

SET @db := DATABASE();

SET @sql := (
  SELECT IF(
    EXISTS(
      SELECT 1 FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'activation_codes' AND COLUMN_NAME = 'ownerUserId'
    ),
    'SELECT 1',
    'ALTER TABLE `activation_codes` ADD `ownerUserId` varchar(255) NULL'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS(
      SELECT 1 FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'activation_codes' AND COLUMN_NAME = 'stripeSessionId'
    ),
    'SELECT 1',
    'ALTER TABLE `activation_codes` ADD `stripeSessionId` varchar(255) NULL'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS(
      SELECT 1 FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'activation_codes' AND COLUMN_NAME = 'planId'
    ),
    'SELECT 1',
    'ALTER TABLE `activation_codes` ADD `planId` varchar(8) NULL'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS(
      SELECT 1 FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'activation_codes' AND INDEX_NAME = 'activation_codes_stripeSessionId_unique'
    ),
    'SELECT 1',
    'ALTER TABLE `activation_codes` ADD CONSTRAINT `activation_codes_stripeSessionId_unique` UNIQUE (`stripeSessionId`)'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS(
      SELECT 1 FROM information_schema.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = @db AND TABLE_NAME = 'activation_codes' AND CONSTRAINT_NAME = 'activation_codes_ownerUserId_user_id_fk'
    ),
    'SELECT 1',
    'ALTER TABLE `activation_codes` ADD CONSTRAINT `activation_codes_ownerUserId_user_id_fk` FOREIGN KEY (`ownerUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
