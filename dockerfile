# Usamos Node.js versão Alpine por ser extremamente leve
FROM node:20-alpine

WORKDIR /app

# Copiamos as dependências primeiro para aproveitar a cache do Docker
COPY package*.json ./
RUN npm install

# Copiamos o código-fonte
COPY . .

# Expomos a porta 8080 (O padrão do nosso backend nesta UF)
EXPOSE 8080

# Comando para rodar em modo desenvolvimento
CMD ["npm", "run", "dev"]