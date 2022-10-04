import * as noteRepository from '../repositories/noteRepository';

export async function createNote(content: string) {
  await noteRepository.create(content);
}

export async function getNotes() {
  const notes = await noteRepository.getAll();
  return notes;
}

export async function getTodayNotes() {
  const notes = await noteRepository.getToday();
  return notes;
}

export async function reviewNote(id: number) {
  await noteRepository.review(id);
}
