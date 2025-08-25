/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(128) NOT NULL,
    ADD COLUMN `uuid` VARCHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `Computer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `publicKey` VARCHAR(600) NULL,
    `computerName` VARCHAR(191) NULL,
    `nickname` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
