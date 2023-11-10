/*
  Warnings:

  - You are about to drop the column `number` on the `mailnumber` table. All the data in the column will be lost.
  - Added the required column `mailAuthNumber` to the `mailnumber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mailnumber` DROP COLUMN `number`,
    ADD COLUMN `mailAuthNumber` VARCHAR(191) NOT NULL;
