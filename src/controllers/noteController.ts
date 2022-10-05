import { Request, Response } from 'express';

import * as noteService from '../services/noteService';

export async function createNote(
  req: Request,
  res: Response,
) {
  const { content, title } = req.body;
  const { userId } = res.locals;

  await noteService.createNote(content, title, userId);

  res.status(201).send('Note registred successfully!');
}

export async function getNotes(
  req: Request,
  res: Response,
) {
  const { userId } = res.locals;

  const notes = await noteService.getNotes(userId);

  res.status(200).send(notes);
}

export async function getTodayNotes(
  req: Request,
  res: Response,
) {
  const { userId } = res.locals;

  const notes = await noteService.getTodayNotes(userId);

  res.status(200).send(notes);
}

export async function reviewNote(
  req: Request,
  res: Response,
) {
  const { id } = req.params;
  const { userId } = res.locals;

  await noteService.reviewNote(Number(id), userId);

  res.sendStatus(200);
}
