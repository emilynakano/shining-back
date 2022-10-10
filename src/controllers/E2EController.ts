import { Request, Response } from 'express';
import * as E2EService from '../services/E2EService';

export async function resetDatabase(
  req: Request,
  res: Response,
) {
  await E2EService.resetDatabase();

  res.sendStatus(200);
}
