# especifica versao de sistema operacional base
FROM node:20-alpine

# Define a pasta onde o codigo vai ser executado
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para a pasta /app
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código-fonte para a pasta /app
COPY . .

# Informar a porta que a aplicação vai usar
EXPOSE 8080

# Comando para executar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]
