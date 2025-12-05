# Backend (Elysia + Bun)
FROM oven/bun:1 AS builder
WORKDIR /app

# Install deps fresh inside the image
COPY bun.lock package.json ./
COPY apps/backend/package.json apps/backend/
COPY apps/frontend/package.json apps/frontend/
RUN bun install --frozen-lockfile --ignore-scripts

# Build / type-check
COPY . .
RUN bun run --filter @acme/backend tsc

FROM oven/bun:1 AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend ./apps/backend
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["bun", "run", "--filter", "@acme/backend", "start"]
