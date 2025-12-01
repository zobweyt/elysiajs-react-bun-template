import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  out: "./src/shared/sqlite/migrations",
  schema: "./src/shared/sqlite/schema.ts",
  dbCredentials: { url: "./sqlite.db" },
});
