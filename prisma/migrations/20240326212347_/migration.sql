/*
  Warnings:

  - You are about to drop the `Produtos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `admId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "admId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" TEXT,
ADD COLUMN     "emerg" TEXT,
ADD COLUMN     "mensalidade" TEXT;

-- DropTable
DROP TABLE "Produtos";

-- CreateTable
CREATE TABLE "Adm" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Adm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_admId_fkey" FOREIGN KEY ("admId") REFERENCES "Adm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
