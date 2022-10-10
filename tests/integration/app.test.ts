import supertest from 'supertest';
import app from '../../src/app';
import prisma from '../../src/config/database';
import { createNote, generateIncorrectNoteData, generateNoteData } from './factories/notesFactory';
import {
  createUser, generateAuthorization, generateIncorrectSignUpUserData, generateSignUpUserData,
} from './factories/userFactory';

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE notes CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE stages CASCADE;`;
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

describe('POST /notes', () => {
  it('201: should be able to create a note', async () => {
    const authorization = await generateAuthorization();
    const note = generateNoteData();

    const result = await agent.post('/notes').set('Authorization', authorization).send(note);

    expect(result.status).toBe(201);
  });

  it('401: should not be able to create a note if not sent a token', async () => {
    const note = generateNoteData();

    const result = await agent.post('/notes').send(note);

    expect(result.status).toBe(401);
  });

  it('422: should not be able to create a note with incorrect data', async () => {
    const note = generateIncorrectNoteData();
    const authorization = await generateAuthorization();

    const result = await agent.post('/notes').set('Authorization', authorization).send(note);

    expect(result.status).toBe(422);
  });
});

describe('GET /notes', () => {
  it('200: should be able to get a note', async () => {
    const authorization = await generateAuthorization();
    await createNote(authorization);

    const result = await agent.get('/notes').set('Authorization', authorization);

    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(1);
  });

  it('401: should not be able to get a note if not sent authorization bearer token', async () => {
    const authorization = await generateAuthorization();
    await createNote(authorization);

    const result = await agent.get('/notes');

    expect(result.status).toBe(401);
  });
});

describe('GET /notes/today', () => {
  it('200: should be able to get a note', async () => {
    const authorization = await generateAuthorization();
    await createNote(authorization);

    const result = await agent.get('/notes/today').set('Authorization', authorization);

    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(1);
  });

  it('401: should not be able to get a note if not sent authorization bearer token', async () => {
    const authorization = await generateAuthorization();
    await createNote(authorization);

    const result = await agent.get('/notes/today');

    expect(result.status).toBe(401);
  });
});

describe('PATCH /notes/review', () => {
  it('200: should be able to review a note', async () => {
    const authorization = await generateAuthorization();
    const id = await createNote(authorization);

    const result = await agent.patch(`/notes/${id}/review`).set('Authorization', authorization);

    expect(result.status).toBe(200);
  });

  it('401: should not be able to review a note if not sent authorization bearer token', async () => {
    const authorization = await generateAuthorization();
    const id = await createNote(authorization);

    const result = await agent.patch(`/notes/${id}/review`);

    expect(result.status).toBe(401);
  });
});
