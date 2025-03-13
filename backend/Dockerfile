FROM node:18

WORKDIR /app

# Instala netcat-openbsd para aguardar o banco de dados
RUN apt-get update && apt-get install -y netcat-openbsd

# Definir variável de ambiente
ENV NODE_ENV=production

# Copiar pacotes e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar todo o código da aplicação
COPY . .

# Garantir permissão para execução do entrypoint
RUN chmod +x entrypoint.sh

# Expor a porta usada pelo backend
EXPOSE 3000

# Definir o script de inicialização
ENTRYPOINT ["sh", "./entrypoint.sh"]