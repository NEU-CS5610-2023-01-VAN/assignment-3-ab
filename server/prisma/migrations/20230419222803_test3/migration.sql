/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_authorId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Tag_name_key` ON `Tag`(`name`);

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
