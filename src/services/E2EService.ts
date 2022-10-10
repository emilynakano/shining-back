import { reset } from '../repositories/E2ERepository';

export async function resetDatabase() {
  console.log('oi from service');
  await reset();
}
