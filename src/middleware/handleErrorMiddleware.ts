import { Request, Response } from 'express';
import { errorTypeToStatusCode, isAppError } from '../utils/errorUtil';

export default function handleErrorMiddleware(
  err: any,
  req:Request,
  res: Response,
) {
  if (isAppError(err)) {
    const statusCode = errorTypeToStatusCode(err.type);
    return res.status(statusCode).send(err.message);
  }

  console.log(err);

  return res.sendStatus(500);
}
