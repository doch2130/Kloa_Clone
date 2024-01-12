-- CreateTable
CREATE TABLE `characterinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `itemLevel` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `server` VARCHAR(191) NOT NULL DEFAULT '',
    `jobClass` VARCHAR(191) NOT NULL DEFAULT '',
    `guildName` VARCHAR(191) NULL DEFAULT '',
    `setArmorEffect` VARCHAR(191) NULL DEFAULT '',
    `jobEngraving` VARCHAR(191) NULL DEFAULT '',
    `itemLevelUpdateDate` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `imgAddress` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
