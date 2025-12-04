import { Elysia, t } from "elysia";

export const userResponseSchema = t.Object({
  id: t.String({ format: "uuid" }),
  username: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const userContracts = new Elysia({ name: "user-contracts" }).model({
  UserResponse: userResponseSchema,
});
