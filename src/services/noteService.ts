import * as noteRepository from '../repositories/noteRepository';
import * as error from '../utils/errorUtil';
import createStage from './stageService';

export async function createNote(content: string, title: string, userId: number) {
  const notes = await noteRepository.getByTitleAndUserId(title, userId);
  if (notes) throw error.conflictError('Note');

  const noteId = await noteRepository.create(content, userId, title);
  await createStage(noteId);
}

export async function getNotes(userId: number) {
  const notes = await noteRepository.getAllByUserId(userId);
  return notes;
}

export async function getTodayNotes(userId: number) {
  const notes = await noteRepository.getToday();
  return notes;
}

export async function reviewNote(id: number, userId: number) {
  await noteRepository.review(id);
}
