/* eslint-disable no-restricted-globals */
import { Request, Response } from 'express';

import * as noteService from '../services/noteService';
import { badRequestError } from '../utils/errorUtil';

export async function createNote(
  req: Request,
  res: Response,
) {
  const { content, title } = req.body;
  const { user } = res.locals;

  await noteService.createNote({ content, title, user });

  res.status(201).send('Note registred successfully!');
}

export async function editNote(
  req: Request,
  res: Response,
) {
  const { content } = req.body;
  const { userId } = res.locals;
  const { id } = req.params;

  if (isNaN(Number(id))) throw badRequestError('Param id must be a number!');

  const note = await noteService.editNote({
    content, id: Number(id), userId,
  });

  res.status(200).send(note);
}

export async function deleteNote(
  req: Request,
  res: Response,
) {
  const { userId } = res.locals;
  const { id } = req.params;

  if (isNaN(Number(id))) throw badRequestError('Param id must be a number!');

  await noteService.deleteNote(userId, Number(id));

  res.sendStatus(200);
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

  if (isNaN(Number(id))) throw badRequestError('Param id must be a number!');

  await noteService.reviewNote(Number(id), userId);

  res.sendStatus(200);
}
