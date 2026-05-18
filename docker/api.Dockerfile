# ==============================
# TrendPulse API (NestJS)
# Multi-stage: dev + prod
# ==============================

# -- Dev Stage (hot-reload via volume mount) --
FROM node:20-alpine AS development
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/
COPY packages/shared/package.json packages/shared/
COPY packages/db/package.json packages/db/
COPY packages/platform-drivers/package.json packages/platform-drivers/

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json turbo.json ./
COPY apps/api/ apps/api/
COPY packages/ packages/

# Inherit from dev for production build
FROM development AS builder
RUN pnpm build --filter=@trendpulse/api

# -- Production Stage --
FROM node:20-alpine AS production
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml /app/turbo.json ./

RUN pnpm install --frozen-lockfile --prod --filter=@trendpulse/api

EXPOSE 4000

CMD ["node", "apps/api/dist/main.js"]
