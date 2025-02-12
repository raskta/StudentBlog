# =========
# Etapa 1: Build da aplicação
# =========
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json next.config.mjs ./
RUN npm ci

COPY . .

# Executa o build do Next.js
RUN npm run build

# =========
# Etapa 2: Imagem de produção
# =========
FROM node:20-alpine AS runner

WORKDIR /app

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Copia os arquivos gerados e os necessários para executar a aplicação
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3001

CMD ["npx", "next", "start"]
