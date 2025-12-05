# Frontend (React + Bun serve)
FROM oven/bun:1 AS builder
WORKDIR /app

COPY bun.lock package.json ./
COPY apps/backend/package.json apps/backend/
COPY apps/frontend/package.json apps/frontend/
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .
RUN bun run --filter @acme/frontend build

FROM oven/bun:1 AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend ./apps/frontend
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/package.json ./package.json

EXPOSE 8000
CMD ["bun", "run", "--filter", "@acme/frontend", "start"]
