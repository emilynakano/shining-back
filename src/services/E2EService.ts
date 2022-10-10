import { reset } from '../repositories/E2ERepository';

export async function resetDatabase() {
  await reset();
}
