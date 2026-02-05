# Ops OS

Production-ready skeleton with API, worker, shared package, and infra. Serverless-friendly Fastify API, Redis event bus, Postgres storage. See `.env.example`.

## Quick Start
- Install dependencies: `npm install`
- Start infra: `docker compose -f infra/docker-compose.yml up -d`
- Dev API: `npm run dev`
- Dev Worker: `npm run -w apps/worker dev`

## Scripts
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Test: `npm run test`

## Packages
- apps/api
- apps/worker
- packages/shared
- infra
