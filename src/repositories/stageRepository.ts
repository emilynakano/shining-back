import prisma from '../config/database';

export default async function createStage(noteId: number) {
  await prisma.stage.create({
    data: { noteId },
  });
}
