import * as noteRepository from '../repositories/noteRepository';
import createStage from './stageService';

export async function createNote(content: string, userId: number) {
  const noteId = await noteRepository.create(content, userId);
  await createStage(noteId);
}

export async function getNotes(userId: number) {
  const notes = await noteRepository.getAll();
  return notes;
}

export async function getTodayNotes(userId: number) {
  const notes = await noteRepository.getToday();
  return notes;
}

export async function reviewNote(id: number, userId: number) {
  await noteRepository.review(id);
}
