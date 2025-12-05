import { Database } from "bun:sqlite";

import { drizzle } from "drizzle-orm/bun-sqlite";

import * as schema from "./schema";

export const db = drizzle(new Database(process.env.DATABASE_URL), { schema });
