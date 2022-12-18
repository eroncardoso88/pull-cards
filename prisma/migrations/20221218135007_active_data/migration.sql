/*
  Warnings:

  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `name` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `info` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `active` to the `CombinationSubject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Analysis` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Card` DROP PRIMARY KEY,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `info` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Combination` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `CombinationInfo` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `CombinationSubject` ADD COLUMN `active` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `CombinationType` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Deck` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Game` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;
