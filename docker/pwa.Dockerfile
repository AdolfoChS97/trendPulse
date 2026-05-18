# ==============================
# TrendPulse PWA (Vue 3 + Vite)
# Multi-stage: dev + prod
# ==============================

# -- Dev Stage --
FROM node:20-alpine AS development
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/pwa/package.json apps/pwa/
COPY packages/shared/package.json packages/shared/

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json turbo.json ./
COPY apps/pwa/ apps/pwa/
COPY packages/ packages/

EXPOSE 8080

CMD ["pnpm", "--filter=@trendpulse/pwa", "dev", "--host", "0.0.0.0"]

# -- Production Build Stage --
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/pwa/package.json apps/pwa/
COPY packages/shared/package.json packages/shared/

RUN pnpm install --frozen-lockfile

COPY tsconfig.base.json turbo.json ./
COPY apps/pwa/ apps/pwa/
COPY packages/ packages/

RUN pnpm build --filter=@trendpulse/pwa

# -- Production Serve Stage --
FROM nginx:alpine AS production
COPY --from=builder /app/apps/pwa/dist /usr/share/nginx/html
COPY docker/nginx/pwa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
