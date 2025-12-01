import { Elysia } from "elysia";

import { authRegisterBodySchema } from "./schemas";

export const authRegisterModel = new Elysia({
  name: "auth-register-model",
}).model({
  AuthRegisterBody: authRegisterBodySchema,
});
