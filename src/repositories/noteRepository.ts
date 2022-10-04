import prisma from '../config/database';

export async function create(content: string, userId: number, title: string) {
  const note = await prisma.note.create({
    data: {
      content, userId, title,
    },
  });

  return note.id;
}

export async function getByTitle(title: string) {
  const note = await prisma.note.findUnique({
    where: { title },
  });
  return note;
}

export async function getAll() {

}

export async function getToday() {

}

export async function review(id: number) {

}
