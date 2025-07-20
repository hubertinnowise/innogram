FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY apps/web ./apps/web
COPY tsconfig.base.json nx.json tsconfig.json project.json ./
COPY packages ./packages

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

RUN pnpm nx build web

EXPOSE 4201

CMD ["pnpm", "next", "start", "--root", "dist/apps/web"]
