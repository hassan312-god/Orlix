# Orlix API

API Fastify gérant les entités Orlix avec Prisma.

## Démarrage
```bash
pnpm install
pnpm --filter @orlix/api db:generate
pnpm --filter @orlix/api dev
```

## Migrations
```bash
pnpm --filter @orlix/api db:migrate
```

## Seed
```bash
pnpm --filter @orlix/api db:seed
```

## Tests
```bash
pnpm --filter @orlix/api test
```
