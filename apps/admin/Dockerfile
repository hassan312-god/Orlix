FROM node:20-bullseye-slim
WORKDIR /app
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json .eslintrc.cjs .prettierrc ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --no-frozen-lockfile --filter @orlix/admin...
RUN pnpm --filter @orlix/admin build

EXPOSE 3000
CMD ["pnpm", "--filter", "@orlix/admin", "start"]
