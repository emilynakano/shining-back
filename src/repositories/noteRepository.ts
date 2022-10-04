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
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    where: { userId },
    include: {
      Stage: {
        select: {
          stage1: true,
          stage2: true,
          stage3: true,
          stage4: true,
        },
      },
    },
  });
  return notes;
}

export async function getToday() {

}

export async function review(id: number) {

}
