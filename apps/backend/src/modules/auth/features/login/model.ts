import { Elysia } from "elysia";

import { authLoginBodySchema } from "./schemas";

export const authLoginModel = new Elysia({ name: "auth-login-model" }).model({
  AuthLoginBody: authLoginBodySchema,
});
