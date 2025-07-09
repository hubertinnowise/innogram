FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY . .

RUN npm install

CMD ["npx", "nx", "serve", "backend", "--configuration=development", "--skip-nx-cache"]

