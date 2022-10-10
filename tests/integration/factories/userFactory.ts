import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import prisma from '../../../src/config/database';

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

  return { ...data, password, confirmPassword };
}
