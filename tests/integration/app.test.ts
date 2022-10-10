import supertest from 'supertest';
import app from '../../src/app';
import prisma from '../../src/config/database';

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /sign-up', () => {
  it('201: create user', async () => {
    const result = await agent.post('/sign-in').send({ oi: 'oi' });

    expect(result.status).toBe(201);
  });
});
