-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `birthday` DATETIME(3) NULL,
    `location` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CombinationType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `deckName` ENUM('MARSEILLE') NOT NULL DEFAULT 'MARSEILLE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Combination` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `combinationTypeId` INTEGER NOT NULL,

    UNIQUE INDEX `Combination_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CombinationInfo` (
    `id` VARCHAR(191) NOT NULL,
    `cardSequenceEnum` VARCHAR(191) NOT NULL,
    `combinationId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CombinationInfo_cardSequenceEnum_key`(`cardSequenceEnum`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Analysis` (
    `id` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `combinationInfoId` VARCHAR(191) NOT NULL,
    `textOne` TEXT NOT NULL,
    `textTwo` TEXT NOT NULL,
    `textThree` TEXT NOT NULL,
    `textFour` TEXT NOT NULL,

    UNIQUE INDEX `Analysis_combinationInfoId_key`(`combinationInfoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` VARCHAR(191) NOT NULL,
    `userPlayerId` VARCHAR(191) NOT NULL,
    `timestamps` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `combinationInfoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `gradeNumber` INTEGER NOT NULL,
    `description` VARCHAR(4000) NOT NULL,
    `timestamps` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gameId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
