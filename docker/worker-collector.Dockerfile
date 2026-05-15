# ==============================
# TrendPulse Worker Collector
# ==============================

FROM node:20-alpine AS development
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml ./
COPY workers/collector/package.json workers/collector/
COPY packages/shared/package.json packages/shared/
COPY packages/db/package.json packages/db/
COPY packages/platform-drivers/package.json packages/platform-drivers/

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json turbo.json ./
COPY workers/collector/ workers/collector/
COPY packages/ packages/

CMD ["pnpm", "--filter=@trendpulse/worker-collector", "dev"]

# -- Production --
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml ./
COPY workers/collector/package.json workers/collector/
COPY packages/shared/package.json packages/shared/
COPY packages/db/package.json packages/db/
COPY packages/platform-drivers/package.json packages/platform-drivers/

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json turbo.json ./
COPY workers/collector/ workers/collector/
COPY packages/ packages/

RUN pnpm build --filter=@trendpulse/worker-collector

FROM node:20-alpine AS production
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY --from=builder /app/workers/collector/dist ./workers/collector/dist
COPY --from=builder /app/workers/collector/package.json ./workers/collector/
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml /app/turbo.json ./

RUN pnpm install --frozen-lockfile --prod --filter=@trendpulse/worker-collector

CMD ["node", "workers/collector/dist/main.js"]
