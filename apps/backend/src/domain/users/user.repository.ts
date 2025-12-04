import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { user } from "./user.table";

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(input: NewUser): Promise<User>;
}
