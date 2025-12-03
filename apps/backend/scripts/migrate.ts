import { Database } from "bun:sqlite";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import config from "../drizzle.config";

const db = drizzle(new Database(process.env.DATABASE_URL));

migrate(db, { migrationsFolder: config.out as string });

console.log("Database migrations applied.");
