/*
  Warnings:

  - You are about to drop the column `emerg` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emerg",
ADD COLUMN     "emerge" TEXT;
