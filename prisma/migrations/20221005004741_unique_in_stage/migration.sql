/*
  Warnings:

  - A unique constraint covering the columns `[noteId]` on the table `stages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stages_noteId_key" ON "stages"("noteId");
