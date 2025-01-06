/*
  Warnings:

  - A unique constraint covering the columns `[userId,language]` on the table `HeroDescription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HeroDescription_userId_language_key" ON "HeroDescription"("userId", "language");
