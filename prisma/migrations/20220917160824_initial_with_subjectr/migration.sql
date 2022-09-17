/*
  Warnings:

  - Added the required column `combinationSubjectId` to the `Combination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Combination` ADD COLUMN `combinationSubjectId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CombinationSubject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `deckName` ENUM('MARSEILLE') NOT NULL DEFAULT 'MARSEILLE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
