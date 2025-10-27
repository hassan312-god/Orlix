# Orlix Platform Monorepo

Bienvenue dans le dépôt principal d'Orlix, une plateforme modulaire pour orchestrer des projets d'intelligence artificielle à travers une interface web (Admin), une application desktop (Studio) et une API Fastify connectée à Postgres. Ce README décrit l'organisation du monorepo, la pile technique, ainsi que les commandes essentielles pour développer, tester et déployer la plateforme.

## Sommaire
- [Architecture générale](#architecture-générale)
- [Périmètre des applications](#périmètre-des-applications)
- [Packages partagés](#packages-partagés)
- [Pile technique](#pile-technique)
- [Prérequis](#prérequis)
- [Mise en route rapide](#mise-en-route-rapide)
- [Bases de données & Prisma](#bases-de-données--prisma)
- [Tests & Qualité](#tests--qualité)
- [Docker & Infrastructure locale](#docker--infrastructure-locale)
- [CI/CD GitHub Actions](#cicd-github-actions)
- [Documentation](#documentation)
- [Définition de fait](#définition-de-fait)

## Architecture générale
```
orlix/
├─ apps/
│  ├─ admin/     # Interface Next.js 14
│  ├─ api/       # API Fastify + Prisma
│  └─ studio/    # Application desktop Tauri + React
├─ packages/
│  ├─ nexus/     # Orchestrateur multi-agents
│  ├─ types/     # Types et schémas partagés
│  ├─ ui/        # Composants React communs
│  └─ utils/     # Fonctions utilitaires
├─ prisma/       # Schéma et migrations SQL
├─ docs/         # Documentation technique
├─ tests/        # Tests e2e Playwright
├─ .github/      # Workflows CI/CD
├─ docker-compose.yml
├─ Dockerfile
├─ package.json
├─ pnpm-workspace.yaml
└─ turbo.json
```

## Périmètre des applications
### Admin (`apps/admin`)
- Next.js 14 avec App Router.
- UI Tailwind et composants partagés du package `@orlix/ui`.
- Tests unitaires via Vitest + Testing Library (`apps/admin/tests`).
- Endpoint de santé `/api/health` pour la supervision.

### API (`apps/api`)
- Fastify 4 avec Prisma pour la persistance.
- Point d'entrée `src/server.ts` exposant une route de santé et la documentation OpenAPI minimale.
- Scripts `db:migrate`, `db:seed` et `db:generate` pour gérer la base Postgres.

### Studio (`apps/studio`)
- Frontend Vite + React couplé à Tauri (Rust) pour le packaging desktop.
- Commandes `tauri:dev` et `tauri:build` pour lancer les builds natifs.
- Tests Vitest couvrant les composants principaux.

## Packages partagés
| Package | Description | Emplacement |
|---------|-------------|-------------|
| `@orlix/nexus` | Abstractions d'orchestration et clients IA factices pour le prototypage. | `packages/nexus` |
| `@orlix/types` | Types TypeScript communs aux apps et services. | `packages/types` |
| `@orlix/ui` | Composants React réutilisables (ex. `StatusBadge`). | `packages/ui` |
| `@orlix/utils` | Fonctions utilitaires (formatage, helpers tests). | `packages/utils` |

Chaque package possède son `package.json`, `tsconfig.json`, un README spécifique et une suite de tests Vitest.

## Pile technique
- **Langage** : TypeScript 5.x (Node.js 20 requis)
- **Frontend Web** : Next.js 14, React 18, TailwindCSS
- **Desktop** : Tauri 2 (Rust) + React via Vite
- **Backend** : Fastify, Prisma, PostgreSQL 15
- **Gestion monorepo** : pnpm 8 + Turborepo
- **Qualité** : ESLint, Prettier, Vitest, Playwright
- **CI/CD** : GitHub Actions (lint, build, tests, release Tauri)

## Prérequis
1. Node.js 20+
2. pnpm 8 (`corepack enable` recommandé)
3. Rust toolchain stable et dépendances Tauri (voir [docs Tauri](https://tauri.app))
4. PostgreSQL 15 (local ou via Docker)
5. Playwright browsers (`pnpm exec playwright install`)

## Mise en route rapide
```bash
pnpm install
cp .env.example .env
pnpm dev
```
La commande `pnpm dev` lance en parallèle :
- `@orlix/admin` sur http://localhost:3000
- `@orlix/api` sur http://localhost:3001
- `@orlix/studio` en mode Vite sur http://localhost:5173 (sans le shell Tauri)

Pour cibler un projet spécifique :
```bash
pnpm --filter @orlix/admin dev
pnpm --filter @orlix/api dev
pnpm --filter @orlix/studio tauri:dev
```

## Bases de données & Prisma
- Schéma : `prisma/schema.prisma`
- Migration initiale : `prisma/migrations/202401010000_init/migration.sql`
- Seed : `prisma/seed.ts`

Commandes utiles :
```bash
pnpm --filter @orlix/api db:migrate   # applique les migrations
pnpm --filter @orlix/api db:seed      # insère les données de démonstration
pnpm --filter @orlix/api db:generate  # régénère le client Prisma
```

## Tests & Qualité
| Type | Commande |
|------|----------|
| Lint global | `pnpm lint` |
| Tests unitaires (tous packages) | `pnpm test` |
| Couverture Vitest | `pnpm test:coverage` |
| Tests e2e Playwright | `pnpm e2e` |

Chaque application dispose également de commandes `pnpm --filter <package> test` pour exécuter ses propres suites.

## Docker & Infrastructure locale
Un environnement complet (Postgres + API + Admin) est disponible via Docker :
```bash
docker-compose up --build
```
- Postgres exposé sur le port 5432 (credentials définis dans `docker-compose.yml`).
- API Fastify disponible sur http://localhost:3001.
- Interface Admin sur http://localhost:3000.

Le `Dockerfile` à la racine construit l'API pour les déploiements containerisés.

## CI/CD GitHub Actions
Deux workflows principaux :
- `.github/workflows/ci.yml` : installation pnpm, lint, tests, build sur chaque push/PR.
- `.github/workflows/release.yml` : build des binaires Tauri (Windows/macOS/Linux) et publication sur GitHub Releases.

Les secrets requis sont mockés via `.env.example` et peuvent être injectés dans les workflows via les `env:` correspondants.

## Documentation
- Architecture technique : `docs/architecture.md`
- Guides spécifiques par application : `apps/*/README.md`
- Référence Playwright e2e : `tests/e2e/admin.spec.ts`

## Définition de fait
- CI verte et lint sans erreurs
- Couverture tests ≥ 80 % (Vitest)
- Documentation OpenAPI accessible (`apps/api/src/openapi.ts`)
- Images Docker construites avec succès
- Builds Tauri fonctionnels
- README synchronisé avec l'état du dépôt
