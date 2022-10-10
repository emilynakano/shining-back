import prisma from '../config/database';

export async function reset() {
  console.log('oi from repository');
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE notes CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE stages CASCADE;`;
}
