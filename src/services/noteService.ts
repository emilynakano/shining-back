/* eslint-disable consistent-return */
import dayjs from 'dayjs';
import * as noteRepository from '../repositories/noteRepository';
import * as error from '../utils/errorUtil';

import createStage from './stageService';
import { progress, progressIsCorrectly } from '../utils/notesUtils';

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
    if (!progressIsCorrectly({ stage: note.Stage[0], date: note.createdAt })) {
      return;
    }
    if (!note.Stage[0].stage1 && dayjs().diff(note.createdAt, 'hour') < 5) {
      return note;
    }
    if (!note.Stage[0].stage2 && dayjs().diff(note.createdAt, 'day') === 1) {
      return note;
    }
    if (!note.Stage[0].stage3 && dayjs().diff(note.createdAt, 'day') === 7) {
      return note;
    }
    if (!note.Stage[0].stage4 && dayjs().diff(note.createdAt, 'month') === 1) {
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
  const note = await noteRepository.findById(id);
  if (!note) {
    throw error.notFoundError('note');
  }

  const isUserNote = await noteRepository.findByUserId(userId, id);
  if (!isUserNote) throw error.badRequestError("another owner's note");

  let data = {};
  if (!note.Stage[0].stage1 && dayjs().diff(note.createdAt, 'hour') < 5) {
    data = {
      stage1: true,
    };
  }
  if (!note.Stage[0].stage2 && dayjs().diff(note.createdAt, 'day') === 1) {
    data = {
      stage2: true,
    };
  }
  if (!note.Stage[0].stage3 && dayjs().diff(note.createdAt, 'day') === 7) {
    data = {
      stage3: true,
    };
  }
  if (!note.Stage[0].stage4 && dayjs().diff(note.createdAt, 'month') === 1) {
    data = {
      stage4: true,
    };
  }
  if (!progressIsCorrectly) {
    data = {};
  }
  if (Object.values(data).length === 0) throw error.badRequestError('Cannot review this note');
  await noteRepository.review(id, data);
}
