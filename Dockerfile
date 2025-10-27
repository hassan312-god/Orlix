FROM node:20-bullseye-slim AS base
WORKDIR /app
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json vitest.config.ts playwright.config.ts .eslintrc.cjs .prettierrc .env.example ./
COPY apps ./apps
COPY packages ./packages
COPY prisma ./prisma

RUN pnpm install --no-frozen-lockfile --ignore-scripts
RUN pnpm --filter @orlix/api build

EXPOSE 3001
CMD ["pnpm", "--filter", "@orlix/api", "start"]
