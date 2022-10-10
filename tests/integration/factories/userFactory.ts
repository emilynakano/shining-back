import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prisma from '../../../src/config/database';

dotenv.config();

export function generateSignUpUserData() {
  const password = faker.internet.password();
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };
}

export function generateIncorrectSignUpUserData() {
  return {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
}

export async function createUser() {
  const {
    name, email, password, confirmPassword,
  } = generateSignUpUserData();

  const hashPassword = bcrypt.hashSync(password, 10);

  const data = {
    name,
    email,
    password: hashPassword,
  };

  await prisma.user.create({
    data,
  });

  return {
    ...data, password, confirmPassword,
  };
}

export async function generateAuthorization() {
  const { email } = await createUser();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  const token = jwt.sign({ id: user?.id }, (process.env.ACCESS_TOKEN_SECRET as string));

  return `Bearer ${token}`;
}

export async function getIdFomAuthorization(authorization: string) {
  const token = authorization.replace('Bearer ', '');
  const decoded = jwt.verify(token, (process.env.ACCESS_TOKEN_SECRET as string));

  const { id } = decoded as { id: number };
  return id;
}
