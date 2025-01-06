/*
  Warnings:

  - You are about to drop the column `shortDescription` on the `ProjectCard` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ProjectCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectCard" DROP COLUMN "shortDescription",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "ProjectCardTranslation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "projectCardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectCardTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCardTranslation_projectCardId_language_key" ON "ProjectCardTranslation"("projectCardId", "language");

-- AddForeignKey
ALTER TABLE "ProjectCardTranslation" ADD CONSTRAINT "ProjectCardTranslation_projectCardId_fkey" FOREIGN KEY ("projectCardId") REFERENCES "ProjectCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
