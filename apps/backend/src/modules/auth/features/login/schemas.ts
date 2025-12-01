import { t } from "elysia";

export const authLoginBodySchema = t.Object({
  username: t.String({ examples: ["username"] }),
  password: t.String({ examples: ["password"] }),
});

export type AuthLoginBodySchema = typeof authLoginBodySchema.static;
