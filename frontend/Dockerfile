FROM node:20-alpine

# Make sure the working directory matches docker-compose
WORKDIR /app

# Copy core files (optional in dev, since we’re mounting anyway)
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY . .

# Install dependencies
RUN npm install

# Run frontend via Nx
CMD ["npx", "nx", "serve", "frontend", "--configuration=development"]
