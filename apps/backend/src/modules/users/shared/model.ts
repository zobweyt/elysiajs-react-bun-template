import { Elysia } from "elysia";

import { userResponseSchema } from "./schema";

export const usersModel = new Elysia({ name: "users-model" }).model({
  UserResponse: userResponseSchema,
});
