import prisma from '../config/database';

export async function create(content: string, userId: number, title: string) {
  const note = await prisma.note.create({
    data: {
      content, userId, title,
    },
  });

  return note.id;
}

export async function getByTitleAndUserId(title: string, userId: number) {
  const note = await prisma.note.findFirst({
    where: {
      userId,
      title,
    },
  });
  return note;
}

export async function getAllByUserId(userId:number) {
  const notes = await prisma.note.findMany({
    where: { userId },
  });
  return notes;
}

export async function getToday() {

}

export async function review(id: number) {

}
