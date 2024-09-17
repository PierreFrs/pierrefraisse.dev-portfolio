/*
  Warnings:

  - A unique constraint covering the columns `[userId,language]` on the table `HeroDescription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `HeroDescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HeroDescription" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "HeroDescription_userId_language_key" ON "HeroDescription"("userId", "language");
