# API Ecopontos - Node.js + MongoDB + Docker

API REST desenvolvida com Node.js, Express e MongoDB para gerenciamento de ecopontos (pontos de coleta seletiva).

## 📋 Funcionalidades

- ✅ CRUD completo de ecopontos (Create, Read, Update, Delete)
- ✅ Validação de dados com Mongoose
- ✅ Documentação automática com Swagger
- ✅ Containerização com Docker
- ✅ Comunicação entre containers via rede interna Docker
- ✅ Filtros de busca por cidade, estado, tipo de resíduo e status

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Docker** - Containerização
- **Swagger** - Documentação da API

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd API-node-mongo-docker
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Porta do servidor
PORT=3000

# Ambiente
NODE_ENV=development

# MongoDB URI
# Para Docker local use:
MONGO_URI=mongodb://mongodb:27017/ecopontos

# Para MongoDB Atlas use:
# MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/ecopontos?retryWrites=true&w=majority
```

### 4. Executar com Docker Compose (Recomendado)

```bash
# Subir todos os serviços (app + mongodb)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar os serviços
docker-compose down
```

A API estará disponível em: `http://localhost:3000`

### 5. Executar localmente (sem Docker)

Certifique-se de ter o MongoDB rodando localmente na porta 27017 e execute:

```bash
npm start
```

## 📚 Documentação da API

A documentação interativa do Swagger está disponível em:

**http://localhost:3000/api-docs**

## 🚀 Endpoints da API

### Base URL
```
http://localhost:3000/api/ecopontos
```

### POST - Criar novo ecoponto
```http
POST /api/ecopontos
Content-Type: application/json

{
  "nome": "Ecoponto Central",
  "endereco": {
    "rua": "Rua das Flores",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01310-100"
  },
  "tipoResiduos": ["papel", "plastico", "vidro"],
  "horarioFuncionamento": {
    "segunda": "08:00 - 18:00",
    "terca": "08:00 - 18:00",
    "quarta": "08:00 - 18:00",
    "quinta": "08:00 - 18:00",
    "sexta": "08:00 - 18:00",
    "sabado": "08:00 - 12:00",
    "domingo": "Fechado"
  },
  "coordenadas": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "telefone": "(11) 1234-5678",
  "observacoes": "Aceita grandes volumes de resíduos"
}
```

### GET - Listar todos os ecopontos
```http
GET /api/ecopontos

# Com filtros opcionais:
GET /api/ecopontos?cidade=São Paulo
GET /api/ecopontos?estado=SP
GET /api/ecopontos?tipoResiduo=papel
GET /api/ecopontos?ativo=true
```

### GET - Buscar ecoponto por ID
```http
GET /api/ecopontos/:id
```

### PUT - Atualizar ecoponto
```http
PUT /api/ecopontos/:id
Content-Type: application/json

{
  "nome": "Ecoponto Central Atualizado",
  "ativo": false
}
```

### DELETE - Remover ecoponto
```http
DELETE /api/ecopontos/:id
```

## 🧪 Testando a API

### Com cURL

```bash
# Criar um ecoponto
curl -X POST http://localhost:3000/api/ecopontos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ecoponto Central",
    "endereco": {
      "rua": "Rua das Flores",
      "numero": "123",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01310-100"
    },
    "tipoResiduos": ["papel", "plastico", "vidro"]
  }'

# Listar todos
curl http://localhost:3000/api/ecopontos

# Buscar por ID
curl http://localhost:3000/api/ecopontos/<ID>

# Atualizar
curl -X PUT http://localhost:3000/api/ecopontos/<ID> \
  -H "Content-Type: application/json" \
  -d '{"nome": "Novo Nome"}'

# Deletar
curl -X DELETE http://localhost:3000/api/ecopontos/<ID>
```

### Com Postman/Insomnia

Importe a coleção de requisições ou use a documentação Swagger para testar:
- Acesse `http://localhost:3000/api-docs`
- Teste os endpoints diretamente na interface do Swagger

## 🐳 Docker

### Estrutura Docker

- **Dockerfile**: Configuração da imagem da aplicação Node.js
- **docker-compose.yml**: Orquestração dos serviços (app + mongodb)
- **Rede interna**: Comunicação entre containers via `ecopontos-network`

### Comandos Docker úteis

```bash
# Construir e subir os containers
docker-compose up -d --build

# Ver logs em tempo real
docker-compose logs -f app

# Parar containers
docker-compose stop

# Remover containers e volumes
docker-compose down -v

# Executar comando dentro do container
docker-compose exec app sh
```

## 📤 Deploy - Publicar API em Serviço Gratuito

### Opções de Deploy Gratuito

1. **Render** (https://render.com) - Recomendado
2. **Railway** (https://railway.app)
3. **Cyclic** (https://cyclic.sh)

### Configurar MongoDB Atlas

1. **Criar conta no MongoDB Atlas**
   - Acesse: https://www.mongodb.com/cloud/atlas
   - Crie uma conta gratuita

2. **Criar um cluster**
   - Escolha o plano gratuito (M0)
   - Selecione uma região próxima
   - Crie o cluster

3. **Configurar acesso ao banco**
   - Em "Security" → "Database Access"
   - Adicione um usuário com senha forte
   - Em "Network Access", adicione `0.0.0.0/0` para permitir acesso de qualquer IP

4. **Obter string de conexão**
   - Em "Database" → "Connect"
   - Escolha "Connect your application"
   - Copie a connection string
   - Formato: `mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/ecopontos?retryWrites=true&w=majority`
   - Substitua `<usuario>` e `<senha>` pelos seus dados

### Deploy no Render

#### 1. Preparar o repositório
- Faça push do código para o GitHub
- Certifique-se de que o Dockerfile está na raiz do projeto

#### 2. Criar Web Service no Render
1. Acesse: https://dashboard.render.com
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório do GitHub
4. Configure o serviço:
   - **Name**: `api-ecopontos` (ou outro nome)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

#### 3. Configurar variáveis de ambiente
No painel do Render, vá em "Environment" e adicione:
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render usa porta 10000 internamente)
- `MONGO_URI`: `mongodb+srv://usuario:senha@cluster.mongodb.net/ecopontos?retryWrites=true&w=majority`

#### 4. Deploy
- Clique em "Create Web Service"
- Aguarde o build e deploy automático
- Sua API estará disponível em: `https://seu-app.onrender.com`

#### 5. Atualizar conexão MongoDB para usar a porta correta
Atualize o arquivo `server.js` para usar a variável PORT do ambiente:

```javascript
const PORT = process.env.PORT || 3000;
```

O código já está configurado corretamente!

# Acessar documentação Swagger
# https://seu-app.onrender.com/api-docs

2. **CORS**:
   Pra acessar a API do FrontEnd na nuvem foi necessário instalar o CORS:

```javascript
import cors from "cors";
app.use(cors());
```

3. **Logs**:
   Monitore os logs no painel do serviço escolhido para verificar erros

## 📝 Estrutura do Projeto

```
API-node-mongo-docker/
├── models/
│   └── Ecoponto.js              # Modelo Mongoose (Schema e validações)
├── services/
│   └── ecopontoService.js       # Service Layer (Lógica de acesso aos dados)
├── controllers/
│   └── ecopontoController.js    # Controller Layer (Lógica HTTP request/response)
├── routes/
│   └── ecopontoRoutes.js        # Routes Layer (Roteamento e documentação Swagger)
├── server.js                    # Servidor Express e configuração
├── package.json                 # Dependências do projeto
├── Dockerfile                   # Configuração Docker da aplicação
├── docker-compose.yml           # Orquestração dos serviços
├── .dockerignore                # Arquivos ignorados no Docker
└── README.md                    # Este arquivo
```

### 🏗️ Arquitetura MVC

O projeto segue uma arquitetura **MVC (Model-View-Controller)** com camadas de Service para melhor separação de responsabilidades:

- **Models** (`models/`): Define o schema do MongoDB e validações com Mongoose
- **Services** (`services/`): Contém a lógica de negócio e acesso aos dados (Repository Pattern)
- **Controllers** (`controllers/`): Gerencia requisições HTTP, chama services e retorna respostas
- **Routes** (`routes/`): Define as rotas da API e documentação Swagger

## 🔒 Validações do Modelo

O modelo Ecoponto possui as seguintes validações:

- **Nome**: obrigatório, mínimo 3 caracteres
- **Endereço**: todos os campos obrigatórios (rua, numero, bairro, cidade, estado, CEP)
- **Estado**: exatamente 2 caracteres (ex: SP, RJ)
- **CEP**: formato válido (ex: 01310-100)
- **Tipo de Resíduos**: array com valores permitidos: papel, plastico, vidro, metal, organico, eletronico, pilhas, oleo
- **Coordenadas**: latitude (-90 a 90) e longitude (-180 a 180)

## 📄 Licença

ISC

## 👨‍💻 Autor

Desenvolvido para atividade acadêmica - P2: Desenvolvimento de API Node.js com MongoDB e Docker
