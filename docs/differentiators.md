# Orlix vs. outils concurrents

Orlix se démarque des plateformes de gestion de projets IA classiques grâce à un socle commun qui aligne interfaces web, bureau et API autour des mêmes modules partagés.

## Expérience multi-interfaces
- **Admin web Next.js** : interface App Router et composants partagés `@orlix/ui` pour piloter les projets directement depuis le navigateur.
- **Studio desktop Tauri** : application multiplateforme empaquetée via Tauri 2, offrant l'expérience hors ligne et l'accès natif aux fichiers locaux.
- **API Fastify** : endpoints REST documentés (`/openapi.json`) permettant l'intégration continue avec d'autres outils.

## Orchestration intelligente intégrée
- Le package `@orlix/nexus` fournit un orchestrateur d'agents avec notifications d'événements et pipeline multi-agents pour prototyper des workflows IA.
- Les types partagés (`@orlix/types`) garantissent la cohérence des payloads du back-end au front-end.

## Chaîne DevOps prête à l'emploi
- Workflows GitHub Actions pour la CI (lint, build, tests) et la génération automatique des binaires Tauri pour Windows/macOS/Linux.
- Docker Compose lance Postgres + API + Admin en local pour tester un environnement proche de la production.
- Fichier `.env.example` partage des secrets mockés pour simplifier l'onboarding et la configuration CI.

## Qualité et couverture
- Suites Vitest et Playwright orchestrées via Turborepo avec des objectifs de couverture ≥ 80 %.
- Linting ESLint/Prettier partagé et scripts unifiés pour accélérer la revue et garantir la qualité du code.

## Comment installer les builds
1. **Prérequis** : Node.js 20, pnpm 8, Rust (pour Tauri) et dépendances système Tauri (GTK/Webkit sur Linux).
2. **Installation** : `pnpm install` puis `pnpm build` pour compiler Admin/API/Studio (Vite). Utilisez `pnpm --filter @orlix/studio tauri:build` pour générer les exécutables desktop.
3. **Docker** : `docker-compose up --build` pour lancer Postgres + API + Admin en un clic.
4. **Tests** : `pnpm test` (unitaires), `pnpm e2e` (e2e) et `pnpm lint` (qualité).

En combinant ces éléments, Orlix offre un environnement clé en main qui accélère la livraison de fonctionnalités IA tout en réduisant le temps de mise en production par rapport aux solutions fragmentées.
