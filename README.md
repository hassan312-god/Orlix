# 🧠 ORLIX – Universal AI Orchestration Platform

Orlix est un écosystème SaaS et Desktop permettant d’orchestrer, déployer et gérer des projets d’intelligence artificielle (agents, sites, apps, automatisations) via une interface centralisée et modulaire.

Ce projet regroupe :
- **Orlix-Admin** : tableau de bord SaaS pour gérer projets, utilisateurs et API.
- **Orlix-Nexus** : moteur d’orchestration multi-agents (GPT, Claude, Gemini, DeepSeek, Sora…).
- **Orlix-Studio (Desktop)** : application Tauri/React pour le développement local et la synchro cloud.
- **Orlix-Core** : API REST et base Postgres gérant les entités principales.
- **Orlix-Hub** : CI/CD automatisée, génération de documentation et publication de builds.

---

## 🧩 Objectif

Fournir un environnement complet pour :
1. **Créer** des projets IA (sites, apps, bots, pipelines, etc.).
2. **Orchestrer** des agents spécialisés (code, design, vidéo, musique, data).
3. **Déployer** automatiquement les résultats sur le cloud (Supabase, GitHub, Vercel, etc.).
4. **Suivre** l’avancement, les logs et les performances en temps réel.
5. **Collaborer** entre administrateurs, développeurs et créateurs via un espace partagé.

---

## ⚙️ Stack Technique

| Domaine | Technologie |
|----------|--------------|
| **Langage principal** | TypeScript 5.6 |
| **Frontend Web** | Next.js 14 + TailwindCSS + shadcn/ui |
| **Desktop App** | Tauri (Rust + WebView) |
| **Backend API** | Node.js + Fastify + Prisma + Supabase |
| **Base de données** | PostgreSQL 15 |
| **Auth** | Supabase Auth + JWT |
| **Cloud Storage** | Supabase Storage |
| **Queue / Workers** | BullMQ (Redis) |
| **Tests** | Vitest + Playwright |
| **CI/CD** | GitHub Actions |
| **Docs** | Docusaurus (dans `/docs`) |
| **Orchestration IA** | OpenRouter API + Orlix-Nexus orchestrator |
| **Build** | pnpm + TurboRepo |

---

## 🧠 Modules Principaux

### 1. **Orlix-Admin**
Interface web pour la gestion globale :
- Tableau de bord
- Gestion des utilisateurs / rôles
- Création et suivi de projets IA
- Historique des tâches, logs et crédits
- Génération automatique de factures et rapports PDF

### 2. **Orlix-Nexus**
Moteur d’orchestration d’agents :
- Agents configurables (Claude, GPT, Gemini, DeepSeek, Sora…)
- Distribution de tâches via pipeline JSON
- Persistance des états d’exécution
- Webhooks et intégrations tierces (GitHub, Supabase, Notion)
- Logs d’exécution et journal IA

### 3. **Orlix-Studio (Desktop)**
- Interface locale (Tauri) synchronisée avec le cloud
- Outils offline (éditeur de prompt, scripts, simulation d’agents)
- Synchronisation automatique avec Orlix-Admin
- Exports PDF / Markdown / JSON

### 4. **Orlix-Core (API)**
Endpoints REST :
- `/projects` : gestion CRUD
- `/agents` : création et configuration
- `/results` : résultats d’orchestration
- `/auth` : gestion utilisateurs
- `/billing` : crédits, abonnements

### 5. **Orlix-Hub**
- Déploiement automatique via GitHub Actions
- Build Tauri (Windows, Linux, macOS)
- Publication sur Supabase Edge Functions
- Monitoring (p95, uptime, logs)

---

## 🗂️ Structure du Dépôt

orlix/
├─ apps/
│ ├─ admin/ # Orlix-Admin (Next.js)
│ ├─ studio/ # Orlix-Studio (Tauri/React)
│ └─ api/ # Orlix-Core (Fastify/Prisma)
├─ packages/
│ ├─ nexus/ # Moteur d’orchestration IA
│ ├─ ui/ # Composants partagés (shadcn/ui)
│ ├─ types/ # Types globaux
│ └─ utils/ # Fonctions communes
├─ prisma/
│ └─ schema.prisma
├─ docs/
│ └─ architecture.md
├─ turbo.json
├─ pnpm-workspace.yaml
├─ Dockerfile
├─ docker-compose.yml
├─ .github/workflows/ci.yml
└─ README.md

---

## 🧱 Base de Données

### Tables principales
- `users` : comptes, rôles, crédits
- `ai_projects` : projets orchestrés
- `ai_agents` : agents configurés
- `ai_tasks` : étapes exécutées
- `ai_results` : sorties et logs
- `subscriptions` : packs et paiements
- `api_keys` : clés externes OpenRouter, Supabase, etc.

---

## 🧪 Tests & Qualité

| Type | Outil | Objectif |
|------|--------|-----------|
| Unitaires | Vitest | Couverture ≥ 80% |
| End-to-end | Playwright | Flux utilisateur complet |
| Lint | ESLint + Prettier | Aucun warning |
| Typage | tsc strict | Zéro erreur |
| Sécurité | npm audit | Pas de vulnérabilité critique |

---

## 🚀 Scripts PNPM

```bash
# Démarrer tous les services
pnpm dev
# Lancer l’API seule
pnpm --filter api dev
# Lancer le front admin
pnpm --filter admin dev
# Lancer l’app desktop
pnpm --filter studio tauri dev
# Tests et lint
pnpm lint && pnpm test
# Build complet
pnpm build
🐳 Déploiement (Docker)
docker-compose up --build
version: "3.8"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: orlix
    ports:
      - "5432:5432"
  api:
    build: ./apps/api
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:orlix@db:5432/orlix
    ports:
      - "3001:3001"
  admin:
    build: ./apps/admin
    depends_on:
      - api
    ports:
      - "3000:3000"
Variables d’Environnement
| Nom                  | Description            | Exemple                                          |
| -------------------- | ---------------------- | ------------------------------------------------ |
| `DATABASE_URL`       | Connexion Postgres     | `postgres://postgres:orlix@localhost:5432/orlix` |
| `OPENROUTER_API_KEY` | Accès orchestrateur IA | `sk-xxx`                                         |
| `SUPABASE_URL`       | API Supabase           | `https://xyz.supabase.co`                        |
| `SUPABASE_KEY`       | Clé publique Supabase  | `eyJ...`                                         |
| `JWT_SECRET`         | Clé JWT                | `supersecret`                                    |

CI/CD (GitHub Actions)
name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
📦 Distribution

Web : déployé sur Vercel ou Supabase Edge.

Desktop : builds Tauri publiés sur GitHub Releases.

API : Docker sur VPS (Render, Fly.io ou Railway).

Database : Supabase Cloud ou Postgres Docker local.

🧩 Extensions futures

Marketplace de modèles d’agents.

Intégration n8n pour automatisations.

Gestion des tokens IA et quotas utilisateurs.

Monitoring en temps réel via websockets.

Mode “Auto-Deploy” GitHub → Orlix Admin.

✅ Définition de Fait (DoD)

CI verte

Tests 80%+

README à jour

Documentation API (OpenAPI)

Aucun TODO actif

Docker build OK

Desktop build OK

Admin accessible sur /

👤 Auteur

Hassan “HK” Bacri Keita
Fondateur & Architecte du projet Orlix
Dakar – Sénégal
© 2025 Orlix Technologies. Tous droits réservés.

💬 Licence

Projet sous licence propriétaire Orlix.
Toute réutilisation, distribution ou modification sans autorisation écrite est interdite.
