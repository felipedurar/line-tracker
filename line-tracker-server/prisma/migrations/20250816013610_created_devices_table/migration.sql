/*
  Warnings:

  - You are about to drop the `Computer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Computer`;

-- CreateTable
CREATE TABLE `Device` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `deviceType` ENUM('pc', 'iot') NOT NULL,
    `hardwareId` VARCHAR(256) NOT NULL,
    `deviceName` VARCHAR(191) NULL,
    `nickname` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manifest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `manifest` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Manifest` ADD CONSTRAINT `Manifest_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
