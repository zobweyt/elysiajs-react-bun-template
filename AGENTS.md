# Repository Guidelines

## Project Structure & Module Organization
- Monorepo on Bun workspaces: `apps/backend` (Elysia + Drizzle) and `apps/frontend` (React served by Bun).
- Backend layout: domain tables/repos in `src/domain/<entity>`, business logic in `src/services`, HTTP layer in `src/controllers` (routes + contracts + macros), infra helpers in `src/http/plugins`, DB wiring/migrations in `src/db`, entrypoint `src/index.ts`.
- Frontend: entry `apps/frontend/src/app/index.html`, pages/components in `src/pages` and `src/shared`, dev server `scripts/serve.ts`.
- Tooling lives at repo root (`biome.json`, `tsconfig.json` per app).

## Setup
- Install once: `bun install` (copies `.env.example` to `.env` in each app).
- Configure DB URL in `apps/backend/.env`; Bun SQLite by default.
- Auto migrations: backend startup runs `drizzle-kit generate` + `migrate` when `AUTO_MIGRATE=true` (default) and `AUTO_GENERATE_MIGRATIONS=true` (default in dev). Disable via env flags if you prefer manual control.

## Build, Test, and Development Commands
- Dev all: `bun run dev` (backend 3000, frontend 8000).
- Dev single app: `bun run --filter @acme/backend dev` or `bun run --filter @acme/frontend dev`.
- Build frontend: `bun run --filter @acme/frontend build`.
- Quality: `bun run format`, `bun run lint`, `bun run tsc`. Clean: `bun run clean`. Manual migration apply: `bun run --filter @acme/backend migrate`.

## Coding Style & Naming Conventions
- Biome: 2 spaces, LF, 80 cols, double quotes, semicolons, trailing commas, sorted imports.
- Prefer `@acme/backend/*` and `@acme/frontend/*` aliases over deep relatives.
- Organize features by entity: table + repository in `domain`, service in `services`, controller in `controllers`; colocate contracts/macros with the controller for quick edits.

## Testing Guidelines
- No suite yet; add `bun test` with `*.test.ts` near the code under test.
- Focus on services and controllers; stub external calls, avoid network in unit tests.

## Commit & Pull Request Guidelines
- Use short, imperative commits (e.g., `Improve docs`, `Add user lookup`).
- Before PR: run `bun run format`, `bun run lint`, `bun run tsc`; call out new env vars and migration impacts; attach screenshots for UI tweaks; link issues.

## Security & Configuration Tips
- Do not commit `.env` or secrets; rotate local keys regularly.
- Review JWT secret/CORS in `apps/backend/src/http/plugins` before widening origins; keep AUTO_GENERATE_MIGRATIONS off in prod-like environments.
