# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by Bun workspaces; apps live in `apps/backend` and `apps/frontend`.
- Backend (Elysia + Drizzle) entry point: `apps/backend/src/index.ts`; feature controllers under `src/modules/<feature>`, shared middleware/config in `src/shared`, migrations configured via `drizzle.config.ts` and run from `scripts/migrate.ts`.
- Frontend (React + Bun serve) entry: `apps/frontend/src/app/index.html`; pages/components in `src/pages` and `src/shared`; dev server logic in `scripts/serve.ts`.
- Repo-level tooling lives beside `biome.json` and per-app `tsconfig.json`; extra notes in `docs/`.

## Setup
- Install everything once: `bun install` (copies `.env.example` to `.env` in each app; fill real values before running).
- Start a database before migrations; adjust connection info in the backend `.env`.
- Apply schema updates when models change: `bun run --filter @acme/backend migrate`.

## Build, Test, and Development Commands
- Run both apps in watch mode: `bun run dev` (backend on 3000, frontend on 8000 by default).
- Target one app: `bun run --filter @acme/backend dev` or `bun run --filter @acme/frontend dev`.
- Build the frontend bundle: `bun run --filter @acme/frontend build`.
- Quality gates: `bun run format` (Biome format), `bun run lint` (Biome lint), `bun run tsc` (type-check all workspaces). Clean artifacts: `bun run clean`.

## Coding Style & Naming Conventions
- Biome enforces 2-space indent, LF endings, 80-char lines, double quotes, semicolons, and trailing commas.
- Keep imports sorted; prefer `@acme/backend/*` and `@acme/frontend/*` aliases over deep relative paths.
- TypeScript is strict—type controllers, route models, and shared utilities; name modules by feature (`auth`, `users`, etc.) and keep files small.

## Testing Guidelines
- No automated suite yet; when adding tests, use Bun’s `bun test` with `*.test.ts` colocated with the module under test.
- Cover route handlers and shared utilities; stub external services and avoid real network calls in unit tests.

## Commit & Pull Request Guidelines
- Match the existing short, imperative commit style (e.g., `Improve docs`, `Fix errors`); keep each commit focused.
- Before a PR, run `bun run format`, `bun run lint`, and `bun run tsc`; note migrations and new env vars; attach screenshots for UI changes and link related issues.
- Mention port changes (3000 backend, 8000 frontend) or breaking API shifts in the PR description.

## Security & Configuration Tips
- Never commit `.env` files or secrets; rotate any shared local keys.
- Keep CORS/OpenAPI settings in `apps/backend/src/shared` aligned with allowed origins; avoid broadening them without review.
