import prisma from '../config/database';

export async function create(content: string, userId: number) {
  const note = await prisma.note.create({
    data: {
      content, userId,
    },
  });

  return note.id;
}

export async function getAll() {

}

export async function getToday() {

}

export async function review(id: number) {

}
