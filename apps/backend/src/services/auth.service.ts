import { passwordHasher } from "@acme/backend/shared/password";

import type { UserRepository } from "../domain/users/user.repository";

export class AuthConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthConflictError";
  }
}

export class AuthUnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthUnauthorizedError";
  }
}

type RegisterInput = {
  username: string;
  password: string;
};

type LoginInput = {
  username: string;
  password: string;
};

export const createAuthService = (users: UserRepository) => ({
  register: async ({ username, password }: RegisterInput) => {
    const existing = await users.findByUsername(username);

    if (existing) {
      throw new AuthConflictError(`User '${username}' already exists`);
    }

    const hashed = await passwordHasher.hash(password);
    return users.create({ username, password: hashed });
  },

  login: async ({ username, password }: LoginInput) => {
    const user = await users.findByUsername(username);

    if (!user) {
      throw new AuthUnauthorizedError("Invalid username or password");
    }

    const valid = await passwordHasher.verify(password, user.password);

    if (!valid) {
      throw new AuthUnauthorizedError("Invalid username or password");
    }

    return user;
  },
});
