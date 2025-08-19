FROM node:20-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY apps/api ./apps/api
COPY tsconfig.base.json nx.json tsconfig.json project.json ./
COPY packages ./packages

RUN pnpm install

RUN pnpm nx build api

COPY apps/api/.env dist/apps/api/.env

CMD ["node", "dist/apps/api/main.js"]

# copied from older /apps/api/ might need to be updated