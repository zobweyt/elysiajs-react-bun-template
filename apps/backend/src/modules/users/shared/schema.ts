import { t } from "elysia";

export const userResponseSchema = t.Object({
  id: t.String({ format: "uuid" }),
  username: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export type UserResponseSchema = typeof userResponseSchema.static;
