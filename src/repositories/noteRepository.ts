import { Note } from '@prisma/client';
import prisma from '../config/database';

export type CreateNote = Pick<Note, 'userId' | 'content' | 'title'>
export type EditNote = Pick<Note, 'content' | 'id' >

export async function create(data: CreateNote) {
  const note = await prisma.note.create({
    data,
  });

  return note.id;
}

export async function update({ id, content }: EditNote) {
  const note = await prisma.note.update({
    where: {
      id,
    },
    data: {
      content,
    },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
  return note;
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

export async function review(noteId: number, data:any) {
  await prisma.stage.update({
    where: {
      noteId,
    },
    data,
  });
}

export async function findById(id: number) {
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
    include: {
      Stage: true,
    },
  });
  return note;
}

export async function findByUserId(userId: number, id:number) {
  const note = await prisma.note.findFirst({
    where: {
      userId, id,
    },
  });
  return note;
}
