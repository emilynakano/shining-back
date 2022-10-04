import { Request, Response } from 'express';

export async function createNote(
  req: Request,
  res: Response,
) {
  res.send('createnote');
}

export async function getNotes(
  req: Request,
  res: Response,
) {
  res.send('getnotes');
}

export async function getTodayNotes(
  req: Request,
  res: Response,
) {
  res.send('gettodaynotes');
}

export async function reviewNote(
  req: Request,
  res: Response,
) {
  res.send('revnotes');
}
