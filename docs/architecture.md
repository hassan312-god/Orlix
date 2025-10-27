# Orlix Architecture Overview

## High-Level Components
- **Admin (Next.js 14)**: SaaS dashboard served from `apps/admin`.
- **Studio (Tauri + React)**: Desktop companion app in `apps/studio` for offline workflows.
- **API (Fastify)**: Core REST API with Prisma integration in `apps/api`.
- **Nexus Engine**: Agent orchestration logic packaged under `packages/nexus`.
- **Shared UI/Types/Utils**: Distributed as pnpm workspaces to reduce duplication.
- **Database**: PostgreSQL 15 managed via Prisma migrations (`prisma/`).

## Request Lifecycle
1. Admin issues requests to the API using authenticated fetch wrappers from `packages/utils`.
2. API validates input types from `packages/types` and persists data via Prisma models.
3. Nexus orchestrator processes agent pipelines and emits events back to Admin via SSE.
4. Studio syncs local projects by consuming API endpoints and bundling assets locally.

## Deployment Targets
- **Web**: Admin deployed on Vercel or Supabase Edge.
- **API**: Containerized via the provided `Dockerfile` and orchestrated with `docker-compose` for local development.
- **Desktop**: Built by GitHub Actions release workflow using the Tauri toolchain.

## Local Development Flow
1. `pnpm install`
2. `pnpm dev` (starts Admin, API, Nexus watchers)
3. `pnpm --filter studio tauri dev` for desktop preview
4. `pnpm test` + `pnpm e2e` ensure ≥80% coverage before pushing.
