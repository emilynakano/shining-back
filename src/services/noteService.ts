import dayjs from 'dayjs';
import * as noteRepository from '../repositories/noteRepository';
import * as error from '../utils/errorUtil';
import createStage from './stageService';

export async function createNote(content: string, title: string, userId: number) {
  const notes = await noteRepository.getByTitleAndUserId(title, userId);
  if (notes) throw error.conflictError('Note');

  const noteId = await noteRepository.create(content, userId, title);
  await createStage(noteId);
}

function findStage(stage: any) {
  if (stage.stage4) {
    return 4;
  }
  if (stage.stage3) {
    return 3;
  }
  if (stage.stage2) {
    return 2;
  }
  if (stage.stage1) {
    return 1;
  }
  return 0;
}

export async function getNotes(userId: number) {
  const notes = await noteRepository.getAllByUserId(userId);
  return notes.map((note) => ({
    id: note.id,
    title: note.title,
    content: note.content,
    progress: note.status ? `${findStage(note.Stage[0])}/4` : 'You lost your progress',
  }));
}

export async function getTodayNotes(userId: number) {
  const notes = await noteRepository.getToday();
  return notes;
}

export async function reviewNote(id: number, userId: number) {
  await noteRepository.review(id);
}
