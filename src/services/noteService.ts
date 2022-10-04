import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as noteRepository from '../repositories/noteRepository';
import * as error from '../utils/errorUtil';
import createStage from './stageService';

dayjs.extend(relativeTime);

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
function findStatus(stage: any, date: any) {
  if (!stage.stage4 && dayjs().diff(date, 'month') > 1) {
    return false;
  }
  if (!stage.stage3 && dayjs().diff(date, 'day') > 7) {
    return false;
  }
  if (!stage.stage2 && dayjs().diff(date, 'day') > 1) {
    return false;
  }
  if (!stage.stage1 && dayjs().diff(date, 'hour') > 5) {
    return false;
  }
  return true;
}
export async function getNotes(userId: number) {
  const notes = await noteRepository.getAllByUserId(userId);
  return notes.map((note) => ({
    id: note.id,
    title: note.title,
    content: note.content,
    date: dayjs(note.createdAt).format('MM/DD/YYYY'),
    progress: findStatus(note.Stage[0], note.createdAt) ? `${findStage(note.Stage[0])}/4` : 'lost',
  }));
}

export async function getTodayNotes(userId: number) {
  const notes = await noteRepository.getToday();
  return notes;
}

export async function reviewNote(id: number, userId: number) {
  await noteRepository.review(id);
}
