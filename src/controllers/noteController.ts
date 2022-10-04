import { Request, Response } from 'express';

import * as noteService from '../services/noteService';

export async function createNote(
  req: Request,
  res: Response,
) {
  const { content } = req.body;

  await noteService.createNote(content);

  res.status(201).send('Note registred successfully!');
}

export async function getNotes(
  req: Request,
  res: Response,
) {
  const notes = await noteService.getNotes();

  res.status(200).send(notes);
}

export async function getTodayNotes(
  req: Request,
  res: Response,
) {
  const notes = await noteService.getTodayNotes();

  res.status(200).send(notes);
}

export async function reviewNote(
  req: Request,
  res: Response,
) {
  const { id } = req.params;

  await noteService.reviewNote(Number(id));

  res.sendStatus(200);
}
