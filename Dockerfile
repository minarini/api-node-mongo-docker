# Usa imagem oficial do Node.js
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências (mude para --only=production para produção)
RUN npm ci

# Copia o restante dos arquivos da aplicação
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Define variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]

