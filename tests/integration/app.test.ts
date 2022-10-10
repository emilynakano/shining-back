import supertest from 'supertest';
import app from '../../src/app';
import prisma from '../../src/config/database';

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});
