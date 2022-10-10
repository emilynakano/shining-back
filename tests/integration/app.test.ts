import supertest from 'supertest';
import app from '../../src/app';
import prisma from '../../src/config/database';
import { generateIncorrectSignUpUserData, generateSignUpUserData } from './factories/userFactory';

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /sign-up', () => {
  it('201: should be able to create an user', async () => {
    const user = generateSignUpUserData();
    const result = await agent.post('/sign-up').send(user);

    expect(result.status).toBe(201);
  });
});
