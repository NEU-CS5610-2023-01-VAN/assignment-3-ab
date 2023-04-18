/*
  Warnings:

  - You are about to drop the column `completed` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Question` DROP COLUMN `completed`,
    ADD COLUMN `answered` BOOLEAN NOT NULL DEFAULT false;
