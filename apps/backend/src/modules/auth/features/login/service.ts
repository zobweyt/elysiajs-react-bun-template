import { getUserByUsername } from "@acme/backend/modules/users";

import { AuthLoginInvalidCredentialsError } from "./errors";
import type { AuthLoginBodySchema } from "./schemas";

export const loginUser = async (schema: AuthLoginBodySchema) => {
  const user = await getUserByUsername(schema.username);

  if (!user) {
    throw new AuthLoginInvalidCredentialsError();
  }

  const verified = await Bun.password.verify(schema.password, user.password);

  if (!verified) {
    throw new AuthLoginInvalidCredentialsError();
  }

  return user;
};
