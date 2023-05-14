/*
  Warnings:

  - Added the required column `tagID` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Answer` MODIFY `content` VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `tagID` INTEGER NOT NULL,
    MODIFY `body` VARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_tagID_fkey` FOREIGN KEY (`tagID`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
