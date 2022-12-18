/*
  Warnings:

  - You are about to drop the column `deckName` on the `CombinationSubject` table. All the data in the column will be lost.
  - You are about to drop the column `deckName` on the `CombinationType` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `CombinationType` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `combinationTypeId` to the `CombinationSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deckId` to the `CombinationType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CombinationSubject` DROP COLUMN `deckName`,
    ADD COLUMN `combinationTypeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CombinationType` DROP COLUMN `deckName`,
    ADD COLUMN `deckId` INTEGER NOT NULL,
    MODIFY `description` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Deck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `info` VARCHAR(191) NULL,
    `deckId` INTEGER NULL,

    INDEX `Card_deckId_idx`(`deckId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Analysis_combinationInfoId_idx` ON `Analysis`(`combinationInfoId`);

-- CreateIndex
CREATE INDEX `Analysis_authorId_idx` ON `Analysis`(`authorId`);

-- CreateIndex
CREATE INDEX `Combination_combinationTypeId_idx` ON `Combination`(`combinationTypeId`);

-- CreateIndex
CREATE INDEX `Combination_combinationSubjectId_idx` ON `Combination`(`combinationSubjectId`);

-- CreateIndex
CREATE INDEX `CombinationInfo_combinationId_idx` ON `CombinationInfo`(`combinationId`);

-- CreateIndex
CREATE INDEX `CombinationSubject_combinationTypeId_idx` ON `CombinationSubject`(`combinationTypeId`);

-- CreateIndex
CREATE INDEX `CombinationType_deckId_idx` ON `CombinationType`(`deckId`);

-- CreateIndex
CREATE INDEX `Game_userPlayerId_idx` ON `Game`(`userPlayerId`);

-- CreateIndex
CREATE INDEX `Game_combinationInfoId_idx` ON `Game`(`combinationInfoId`);

-- CreateIndex
CREATE INDEX `Review_gameId_idx` ON `Review`(`gameId`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);
