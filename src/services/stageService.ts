import create from '../repositories/stageRepository';

export default async function createStage(noteId: number) {
  await create(noteId);
}
