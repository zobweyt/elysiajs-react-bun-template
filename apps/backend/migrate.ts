import { Database } from "bun:sqlite";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import config from "./drizzle.config";

const sqlite = new Database(process.env.DATABASE_URL);
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: config.out as string });
