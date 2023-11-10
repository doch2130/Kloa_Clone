/*
  Warnings:

  - You are about to drop the column `published` on the `mainnotices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mainnotices` DROP COLUMN `published`,
    MODIFY `viewCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `recomendCount` INTEGER NOT NULL DEFAULT 0;
