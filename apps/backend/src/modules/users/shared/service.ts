import { eq } from "drizzle-orm";

import { user } from "@acme/backend/modules/users/table";
import { db } from "@acme/backend/shared/sqlite";

export const getUserById = async (id: string) => {
  return (await db.query.user.findFirst({ where: eq(user.id, id) })) ?? null;
};

export const getUsers = async () => {
  return await db.query.user.findMany({});
};

export const getUserByUsername = async (username: string) => {
  return (
    (await db.query.user.findFirst({ where: eq(user.username, username) })) ??
    null
  );
};

export const createUser = async (values: {
  username: string;
  password: string;
}) => {
  const [entity] = await db.insert(user).values(values).returning();
  return entity;
};
