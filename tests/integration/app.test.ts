import supertest from 'supertest';
import app from '../../src/app';
import prisma from '../../src/config/database';
import { createUser, generateIncorrectSignUpUserData, generateSignUpUserData } from './factories/userFactory';

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

  it('422: should not be able to create an user with incorrect format', async () => {
    const user = generateIncorrectSignUpUserData();

    const result = await agent.post('/sign-up').send(user);

    expect(result.status).toBe(422);
  });

  it('409: should not be able to create an user that already exists', async () => {
    const user = await createUser();

    const result = await agent.post('/sign-up').send(user);

    expect(result.status).toBe(409);
  });
});

describe('POST /sign-in', () => {
  it('200: should be able to login an user', async () => {
    const { email, password } = await createUser();

    const result = await agent.post('/sign-in').send({ email, password });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('accessToken');
  });

  it('422: should not be able to login an user with incorrect format', async () => {
    const result = await agent.post('/sign-in').send({ email: '', password: '' });

    expect(result.status).toBe(422);
  });

  it('401: should not be able to login an user with incorrect credentials', async () => {
    const { email } = await createUser();

    const result = await agent.post('/sign-in').send({ email, password: 'incorrect' });

    expect(result.status).toBe(401);
  });
});
