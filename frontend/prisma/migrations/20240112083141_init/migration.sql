/*
  Warnings:

  - Made the column `content` on table `mainnotices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `mainnotices` MODIFY `content` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `privacy` BOOLEAN NOT NULL DEFAULT false;
