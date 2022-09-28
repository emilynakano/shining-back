/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { errorTypeToStatusCode, isAppError } from '../utils/errorUtil';

// eslint-disable-next-line consistent-return
export default function handleErrorMiddleware(
  err: any,
  req:Request,
  res: Response,
  next: NextFunction,
) {
  if (isAppError(err)) {
    const statusCode = errorTypeToStatusCode(err.type);
    return res.status(statusCode).send(err.message);
  }

  console.log(err);

  return res.sendStatus(500);
}
