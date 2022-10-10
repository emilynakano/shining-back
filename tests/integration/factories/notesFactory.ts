import { faker } from '@faker-js/faker';

export function generateNoteData() {
  return {
    title: faker.name.jobArea(),
    content: faker.name.jobDescriptor(),
  };
}
