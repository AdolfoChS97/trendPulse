# ==============================
# TrendPulse Web (Nuxt 3)
# Multi-stage: dev + prod
# ==============================

# -- Dev Stage --
FROM node:20-alpine AS development
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json turbo.json ./
COPY apps/web/ apps/web/
COPY packages/ packages/

EXPOSE 3000

CMD ["pnpm", "--filter=@trendpulse/web", "dev", "--host", "0.0.0.0"]

# -- Production Build Stage --
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json turbo.json ./
COPY apps/web/ apps/web/
COPY packages/ packages/

RUN pnpm build --filter=@trendpulse/web

# -- Production Serve Stage --
FROM node:20-alpine AS production
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY --from=builder /app/apps/web/.output ./apps/web/.output
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/packages ./packages

EXPOSE 3000

CMD ["node", "apps/web/.output/server/index.mjs"]
