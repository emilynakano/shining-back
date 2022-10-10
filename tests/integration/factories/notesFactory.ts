import { faker } from '@faker-js/faker';
import prisma from '../../../src/config/database';
import { getIdFomAuthorization } from './userFactory';

export function generateNoteData() {
  return {
    title: faker.name.jobArea(),
    content: faker.name.jobDescriptor(),
  };
}

export function generateIncorrectNoteData() {
  return {
    title: '',
    content: '',
  };
}

export async function createNote(authorization: string) {
  const userId = await getIdFomAuthorization(authorization);
  const note = generateNoteData();

  const { id } = await prisma.note.create({
    data: { ...note, userId },
  });

  await prisma.stage.create({
    data: { noteId: id },
  });
}
