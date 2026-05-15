# ==============================
# TrendPulse Worker Analytics
# ==============================

FROM node:20-alpine AS development
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml ./
COPY workers/analytics/package.json workers/analytics/
COPY packages/shared/package.json packages/shared/
COPY packages/db/package.json packages/db/

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json turbo.json ./
COPY workers/analytics/ workers/analytics/
COPY packages/ packages/

CMD ["pnpm", "--filter=@trendpulse/worker-analytics", "dev"]

# -- Production --
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml ./
COPY workers/analytics/package.json workers/analytics/
COPY packages/shared/package.json packages/shared/
COPY packages/db/package.json packages/db/

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json turbo.json ./
COPY workers/analytics/ workers/analytics/
COPY packages/ packages/

RUN pnpm build --filter=@trendpulse/worker-analytics

FROM node:20-alpine AS production
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY --from=builder /app/workers/analytics/dist ./workers/analytics/dist
COPY --from=builder /app/workers/analytics/package.json ./workers/analytics/
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml /app/turbo.json ./

RUN pnpm install --frozen-lockfile --prod --filter=@trendpulse/worker-analytics

CMD ["node", "workers/analytics/dist/main.js"]
