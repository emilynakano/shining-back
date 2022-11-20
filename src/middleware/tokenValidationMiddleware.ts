import { Response, Request, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { unauthorizedError } from '../utils/errorUtil';
import { findUserById } from '../services/authService';

dotenv.config();

export default async function tokenValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;
  if (!authorization?.startsWith('Bearer ')) throw unauthorizedError('header');

  const token = authorization.replace('Bearer ', '');
  if (!token) throw unauthorizedError('token');

  try {
    const decoded = jwt.verify(token, (process.env.ACCESS_TOKEN_SECRET as string));
    const { id } = decoded as { id: number };

    const user = await findUserById(id);
    if (!user) throw unauthorizedError('token');

    res.locals.userId = user.id;
    res.locals.user = user;

    next();
  } catch (error) {
    throw unauthorizedError('token');
  }
}
