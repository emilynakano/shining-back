import { faker } from '@faker-js/faker';

export function generateSignUpUserData() {
  const password = faker.internet.password();
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };
}
