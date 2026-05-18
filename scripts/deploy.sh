#!/bin/bash
# ======================================
# TrendPulse — Deploy Script
# ======================================
# Usage: bash scripts/deploy.sh <tag>
# Example: bash scripts/deploy.sh v1.2.3
#
# Pipeline:
#   1. Pull staging images
#   2. Start staging containers
#   3. Wait for health checks
#   4. Run smoke tests
#   5. If OK → deploy production
#   6. Cleanup staging
# ======================================

set -euo pipefail

TAG="${1:-latest}"
STAGING_API_URL="${STAGING_API_URL:-http://localhost:4001}"
STAGING_APP_URL="${STAGING_APP_URL:-http://localhost:8081}"
PROD_COMPOSE="docker compose -f docker-compose.prod.yml"
STAGING_COMPOSE="docker compose -f docker-compose.staging.yml"
HEALTH_RETRIES=12
HEALTH_DELAY=5

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()   { echo -e "${GREEN}[deploy]${NC} $1"; }
warn()  { echo -e "${YELLOW}[deploy]${NC} $1"; }
err()   { echo -e "${RED}[deploy]${NC} $1"; }

# ─────────────── 1. Pull staging images ───────────────

log "Pulling staging images (tag: $TAG)..."
export TAG
$STAGING_COMPOSE pull --quiet 2>&1

# ─────────────── 2. Start staging ───────────────

log "Starting staging containers..."
$STAGING_COMPOSE up -d

# ─────────────── 3. Health checks ───────────────

log "Waiting for staging health checks..."
for i in $(seq 1 $HEALTH_RETRIES); do
  if curl -sf "$STAGING_API_URL/api/health" > /dev/null 2>&1; then
    log "Staging API healthy (attempt $i/${HEALTH_RETRIES})"
    break
  fi
  if [ "$i" -eq "$HEALTH_RETRIES" ]; then
    err "Staging API failed health check after $HEALTH_RETRIES attempts"
    err "Staging kept running for debugging. Production untouched."
    exit 1
  fi
  sleep "$HEALTH_DELAY"
done

# ─────────────── 4. Smoke tests ───────────────

log "Running smoke tests against staging..."

# Health endpoint returns valid JSON
HEALTH_JSON=$(curl -sf "$STAGING_API_URL/api/health")
if echo "$HEALTH_JSON" | grep -q '"status"'; then
  log "Smoke test 1/2: health endpoint OK"
else
  err "Smoke test 1/2 FAILED: health endpoint returned unexpected response"
  err "Staging kept for debug. Production untouched."
  exit 1
fi

# Staging PWA serves HTML
if curl -sf "$STAGING_APP_URL" | grep -q '<!DOCTYPE html>'; then
  log "Smoke test 2/2: PWA serves HTML OK"
else
  err "Smoke test 2/2 FAILED: PWA not serving"
  err "Staging kept for debug. Production untouched."
  exit 1
fi

# ─────────────── 5. Deploy production ───────────────

log "Smoke tests passed. Deploying to production..."
$PROD_COMPOSE pull --quiet 2>&1
$PROD_COMPOSE up -d

log "Production deployed with tag: $TAG"

# ─────────────── 6. Cleanup staging ───────────────

log "Stopping staging containers..."
$STAGING_COMPOSE down

log "Deploy complete. Tag $TAG is now live."
