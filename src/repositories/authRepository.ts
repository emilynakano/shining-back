import { CreateUser } from '../services/authService';

import prisma from '../config/database';

export async function registerUser(dataUser: CreateUser) {
  await prisma.user.create({
    data: dataUser,
  });
}

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function findUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}
