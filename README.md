# TrendPulse

**Social media trend analysis platform for entrepreneurs and creators.**

Track emerging trends across X, YouTube, Instagram, TikTok, and Twitch — all in one dashboard.

---

## Architecture

```
Nuxt 3 (Web) ──┐
                ├──→ NestJS API ──→ PostgreSQL
Vue 3 (PWA) ───┘         │
                          ├──→ Redis (Bull queues)
                          │       │
                          └──→ Workers ──→ Platform APIs (X, YT, IG, TK, TW)
```

- **Web**: Nuxt 3 SSR (landing + dashboard desktop)
- **PWA**: Vue 3 + Vite (mobile, offline-first)
- **API**: NestJS (REST, JWT auth, Google OAuth, platform OAuth)
- **Workers**: Node.js + Bull + Redis (data collection, trend analytics)
- **DB**: PostgreSQL + TypeORM
- **Infra**: Docker Compose (postgres, redis, api, workers, nginx)

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [pnpm](https://pnpm.io) >= 9 (`corepack enable && corepack prepare pnpm@latest --activate`)
- [Docker](https://www.docker.com/) (optional, for production-like environment)

### Setup

```bash
# Clone
git clone https://github.com/AdolfoChS97/trendPulse.git
cd trendPulse

# Install dependencies
pnpm install

# Start development (all packages in parallel)
pnpm dev
```

### Run individual packages

```bash
# PWA only (Vite dev server on :8080)
pnpm dev --filter=@trendpulse/pwa

# API only (NestJS on :4000, requires postgres + redis)
pnpm dev --filter=@trendpulse/api

# Workers only
pnpm dev --filter="@trendpulse/worker-*"

# Build all packages
pnpm build
```

### Run with Docker

```bash
# All services
docker compose up

# Just infrastructure + PWA
docker compose up postgres redis api pwa
```

---

## Project Structure

```
trendpulse/
├── apps/
│   ├── web/                 # Nuxt 3 (Web SSR)
│   ├── pwa/                 # Vue 3 + Vite (PWA)
│   └── api/                 # NestJS (Backend API)
├── packages/
│   ├── shared/              # Types, DTOs, validators
│   ├── db/                  # TypeORM entities + migrations
│   └── platform-drivers/    # X, YT, IG, TikTok, Twitch drivers
├── workers/
│   ├── collector/           # Data collection workers
│   └── analytics/           # Trend score + sentiment workers
├── docker/
│   ├── api.Dockerfile
│   ├── pwa.Dockerfile
│   ├── web.Dockerfile
│   ├── worker-collector.Dockerfile
│   ├── worker-analytics.Dockerfile
│   └── nginx/
│       └── pwa.conf
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Stack

| Layer | Technology |
|---|---|
| **Frontend** | Nuxt 3, Vue 3, Vite, Pinia, Tailwind CSS, Recharts |
| **Backend** | NestJS, TypeScript, Passport.js, JWT |
| **Database** | PostgreSQL, TypeORM |
| **Queue** | Bull/BullMQ, Redis |
| **ML** | HuggingFace Inference API |
| **Auth** | Google OAuth + Platform OAuth (X, YT, IG, TikTok, Twitch) |
| **Payments** | Polar.sh + Coinbase Commerce |
| **Testing** | Jest, Playwright |
| **Monitoring** | Sentry, Uptime Kuma, Bull Board |
| **CI/CD** | GitHub Actions, Docker |

---

## Documentation

- [PDR (Preliminary Design Review)](../move-forward/README.md)
- [Plan Técnico (44 tareas)](../move-forward/plan.md)
- [Guía de Branding](../move-forward/branding.md)
- [Ejemplos visuales de paletas](../move-forward/branding-examples.html)

---

## License

Proprietary — All rights reserved.
