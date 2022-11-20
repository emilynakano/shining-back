import { User } from '@prisma/client';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authRepository from '../repositories/authRepository';
import * as errorUtils from '../utils/errorUtil';
import * as refreshTokenService from '../services/refreshTokenService';

export type CreateUser = Omit<User, 'id' | 'plan'>
export type LoginUser = Omit<User, 'id' | 'name' | 'plan'>

export async function registerUser(dataUser: CreateUser) {
  const { email, password } = dataUser;

  const user = await authRepository.findUserByEmail(email);
  if (user) throw errorUtils.conflictError('email');

  const hashPassword = bcrypt.hashSync(password, 10);

  await authRepository.registerUser({ ...dataUser, password: hashPassword });
}

export async function loginUser(dataUser: LoginUser) {
  const { email, password } = dataUser;

  const user = await authRepository.findUserByEmail(email);
  if (!user) throw errorUtils.unauthorizedError('credentials');

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) throw errorUtils.unauthorizedError('credentials');

  const accessToken = jwt.sign({ id: user.id }, (process.env.ACCESS_TOKEN_SECRET as string), { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user.id }, (process.env.REFRESH_TOKEN_SECRET as string), { expiresIn: '1d' });

  await refreshTokenService.createRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken, username: user.name };
}

export async function findUserById(id: number) {
  const user = await authRepository.findUserById(id);
  return user;
}

export async function changeToPremiumPlan(id: number) {
  await authRepository.changeToPremiumPlan(id);
}

export async function changeToFreePlan(id: number) {
  await authRepository.changeToFreePlan(id);
}
