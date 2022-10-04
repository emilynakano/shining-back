/*
  Warnings:

  - You are about to drop the column `stageId` on the `notes` table. All the data in the column will be lost.
  - Added the required column `noteId` to the `stages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_stageId_fkey";

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "stageId";

-- AlterTable
ALTER TABLE "stages" ADD COLUMN     "noteId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "stages" ADD CONSTRAINT "stages_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
