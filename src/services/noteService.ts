import dayjs from 'dayjs';
import * as noteRepository from '../repositories/noteRepository';
import * as error from '../utils/errorUtil';

import createStage from './stageService';
import progress from '../utils/notesUtils';

export async function createNote(content: string, title: string, userId: number) {
  const notes = await noteRepository.getByTitleAndUserId(title, userId);
  if (notes) throw error.conflictError('Note');

  const noteId = await noteRepository.create(content, userId, title);
  await createStage(noteId);
}

export async function getNotes(userId: number) {
  const notes = await noteRepository.getAllByUserId(userId);
  return notes.map((note) => ({
    id: note.id,
    title: note.title,
    content: note.content,
    date: dayjs(note.createdAt).format('MM/DD/YYYY'),
    progress: progress({ stage: note.Stage[0], date: note.createdAt }),
  }));
}

export async function getTodayNotes(userId: number) {
  const notes = await noteRepository.getAllByUserId(userId);
  // eslint-disable-next-line array-callback-return, consistent-return
  const filteredNotes = notes.filter((note) => {
    if (!note.Stage[0].stage1 && dayjs().diff(note.createdAt, 'hour') < 5) {
      return note;
    }
    if (!note.Stage[0].stage2 && dayjs().diff(note.createdAt, 'day') > 1 && dayjs().diff(note.createdAt, 'day') < 2) {
      return note;
    }
    if (!note.Stage[0].stage3 && dayjs().diff(note.createdAt, 'day') < 8 && dayjs().diff(note.createdAt, 'day') > 7) {
      return note;
    }
    if (!note.Stage[0].stage4 && dayjs().diff(note.createdAt, 'month') > 1 && dayjs().diff(note.createdAt, 'month') < 2) {
      return note;
    }
  });

  return filteredNotes.map((note) => {
    const answer = {
      id: note.id,
      title: note.title,
      content: note.content,
    };
    return answer;
  });
}

export async function reviewNote(id: number, userId: number) {
  await noteRepository.review(id);
}
