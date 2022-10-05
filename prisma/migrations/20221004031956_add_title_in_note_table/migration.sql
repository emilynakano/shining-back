/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `notes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "notes_title_key" ON "notes"("title");
