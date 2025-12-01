import { createUser, getUserByUsername } from "@acme/backend/modules/users";

import { AuthRegisterConflictError } from "./errors";
import type { AuthRegisterBodySchema } from "./schemas";

export const registerUser = async (schema: AuthRegisterBodySchema) => {
  const user = await getUserByUsername(schema.username);

  if (user) {
    throw new AuthRegisterConflictError(user.username);
  }

  return createUser({
    username: schema.username,
    password: await Bun.password.hash(schema.password),
  });
};
