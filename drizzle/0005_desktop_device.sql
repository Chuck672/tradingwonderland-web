-- Computers registered to a PiTradingAgent membership.
-- One membership may have two rows. userId + deviceId is one computer.
-- Run once in phpMyAdmin with database u904162120_QuantLogicLab selected,
-- before the desktop device routes are deployed. Safe to run again:
-- the table and the foreign key are created only when they are missing.
-- This file does not include a credential, a connection string, or an API secret.
-- Plain equivalent, if PREPARE is disabled and the foreign key is missing:
--   ALTER TABLE `desktop_device` ADD CONSTRAINT `desktop_device_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

CREATE TABLE IF NOT EXISTS `desktop_device` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `deviceId` varchar(128) NOT NULL,
  `deviceName` varchar(120) NULL,
  `createdAt` datetime NOT NULL,
  `lastSeenAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `desktop_device_userId_deviceId_unique` (`userId`, `deviceId`)
);

SET @db := DATABASE();

SET @sql := (
  SELECT IF(
    EXISTS(
      SELECT 1 FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = @db
        AND TABLE_NAME = 'desktop_device'
        AND INDEX_NAME = 'desktop_device_userId_deviceId_unique'
    ),
    'SELECT 1',
    'ALTER TABLE `desktop_device` ADD CONSTRAINT `desktop_device_userId_deviceId_unique` UNIQUE (`userId`, `deviceId`)'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS(
      SELECT 1 FROM information_schema.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = @db
        AND TABLE_NAME = 'desktop_device'
        AND CONSTRAINT_NAME = 'desktop_device_userId_user_id_fk'
    ),
    'SELECT 1',
    'ALTER TABLE `desktop_device` ADD CONSTRAINT `desktop_device_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
