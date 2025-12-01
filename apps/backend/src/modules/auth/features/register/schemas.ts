import { t } from "elysia";

export const authRegisterBodySchema = t.Object({
  username: t.String({ minLength: 2, maxLength: 32, examples: ["username"] }),
  password: t.String({ minLength: 8, examples: ["password"] }),
});

export type AuthRegisterBodySchema = typeof authRegisterBodySchema.static;
