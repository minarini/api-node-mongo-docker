# 📤 Guia de Deploy - API Ecopontos

Este guia fornece instruções detalhadas para fazer deploy da API em serviços gratuitos e conectar ao MongoDB Atlas.

## 🔧 Pré-requisitos

- Conta no GitHub
- Conta no MongoDB Atlas (gratuita)
- Conta em um dos serviços de deploy (Render, Railway ou Cyclic)

---

## 🗄️ Configurar MongoDB Atlas

### Passo 1: Criar conta no MongoDB Atlas

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Clique em "Try Free" e crie sua conta
3. Complete o registro

### Passo 2: Criar um Cluster

1. Após o login, você verá a opção "Build a Database"
2. Escolha o plano **FREE (M0)**
3. Selecione uma **região próxima** (ex: São Paulo - AWS)
4. Deixe o nome do cluster padrão ou personalize
5. Clique em **"Create"** e aguarde alguns minutos

### Passo 3: Configurar Acesso ao Banco

#### 3.1 Criar Usuário do Banco de Dados

1. No menu lateral, vá em **"Security" → "Database Access"**
2. Clique em **"Add New Database User"**
3. Escolha **"Password"** como método de autenticação
4. Preencha:
   - **Username**: `ecopontos_user` (ou outro nome)
   - **Password**: Gere uma senha forte e **salve em local seguro**
   - **Database User Privileges**: Deixe "Read and write to any database"
5. Clique em **"Add User"**

#### 3.2 Configurar Network Access (Acesso de Rede)

1. No menu lateral, vá em **"Security" → "Network Access"**
2. Clique em **"Add IP Address"**
3. Para permitir acesso de qualquer lugar (útil para deploy):
   - Clique em **"Allow Access from Anywhere"**
   - Isso adiciona `0.0.0.0/0` à whitelist
   - ⚠️ **Nota**: Para produção, é melhor adicionar IPs específicos
4. Clique em **"Confirm"**

### Passo 4: Obter String de Conexão

1. No menu lateral, vá em **"Database" → "Connect"**
2. Clique em **"Connect your application"**
3. Escolha **"Node.js"** como driver e **versão 5.5 ou posterior**
4. Copie a **Connection String** que aparece
5. Ela terá o formato:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Substitua**:
   - `<username>` pelo usuário criado (ex: `ecopontos_user`)
   - `<password>` pela senha criada
   - Adicione o nome do banco antes do `?`: `/ecopontos`
   
7. **String final deve ficar assim:**
   ```
   mongodb+srv://ecopontos_user:SUA_SENHA@cluster0.xxxxx.mongodb.net/ecopontos?retryWrites=true&w=majority
   ```

### Passo 5: Testar Conexão (Opcional)

Você pode testar a conexão localmente antes de fazer o deploy:

1. No arquivo `.env` local, adicione:
   ```env
   MONGO_URI=mongodb+srv://ecopontos_user:SUA_SENHA@cluster0.xxxxx.mongodb.net/ecopontos?retryWrites=true&w=majority
   ```

2. Execute a aplicação:
   ```bash
   npm start
   ```

3. Se conectar com sucesso, verá a mensagem: "MongoDB conectado!"

---

## 🚀 Deploy no Render

### Passo 1: Preparar Repositório

1. Certifique-se de que seu código está no GitHub
2. Verifique se os arquivos principais estão na raiz:
   - `server.js`
   - `package.json`
   - `Dockerfile` (opcional)
   - Pasta `models/`
   - Pasta `routes/`

### Passo 2: Criar Web Service no Render

1. Acesse: https://dashboard.render.com
2. Clique em **"Sign Up"** ou faça login
3. Conecte sua conta do GitHub
4. No dashboard, clique em **"New +" → "Web Service"**
5. Selecione o repositório do seu projeto
6. Preencha as configurações:
   - **Name**: `api-ecopontos` (ou outro nome)
   - **Region**: Escolha a região mais próxima
   - **Branch**: `main` (ou `master`)
   - **Root Directory**: Deixe em branco (raiz)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
7. Clique em **"Advanced"** para ver mais opções

### Passo 3: Configurar Variáveis de Ambiente

No painel do Render, antes de criar o serviço:

1. Role até **"Environment Variables"**
2. Clique em **"Add Environment Variable"**
3. Adicione as seguintes variáveis:

   ```
   NODE_ENV = production
   PORT = 10000
   MONGO_URI = mongodb+srv://ecopontos_user:SUA_SENHA@cluster0.xxxxx.mongodb.net/ecopontos?retryWrites=true&w=majority
   ```

   ⚠️ **Importante**: 
   - Substitua `SUA_SENHA` pela senha real do MongoDB Atlas
   - Substitua a URL completa pela sua connection string do Atlas

### Passo 4: Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build (pode levar alguns minutos na primeira vez)
3. Você verá os logs em tempo real
4. Quando aparecer "Your service is live", está pronto!

### Passo 5: Testar

1. Copie a URL do serviço (ex: `https://api-ecopontos.onrender.com`)
2. Acesse: `https://api-ecopontos.onrender.com/api-docs`
3. Deve aparecer a documentação Swagger

### Importante sobre Render

- ⚠️ Render coloca serviços gratuitos em **sleep após 15 minutos de inatividade**
- O primeiro acesso após sleep pode demorar ~30 segundos
- Para evitar isso, considere usar Railway ou Cyclic

---

## 🚂 Deploy no Railway

### Passo 1: Conectar Repositório

1. Acesse: https://railway.app
2. Clique em **"Login"** e faça login com GitHub
3. No dashboard, clique em **"New Project"**
4. Selecione **"Deploy from GitHub repo"**
5. Selecione seu repositório
6. O Railway começará a detectar automaticamente a aplicação Node.js

### Passo 2: Configurar Variáveis de Ambiente

1. No projeto criado, clique em seu serviço
2. Vá na aba **"Variables"**
3. Clique em **"New Variable"**
4. Adicione:

   ```
   MONGO_URI = mongodb+srv://ecopontos_user:SUA_SENHA@cluster0.xxxxx.mongodb.net/ecopontos?retryWrites=true&w=majority
   ```

   ⚠️ A porta `PORT` é fornecida automaticamente pelo Railway via `${{PORT}}`

### Passo 3: Deploy Automático

1. O Railway fará o deploy automaticamente
2. Aguarde alguns minutos
3. Quando terminar, você verá a URL do serviço (ex: `https://seu-app.railway.app`)
4. Clique na URL ou em **"Generate Domain"** para criar um domínio customizado

### Passo 4: Testar

1. Acesse: `https://seu-app.railway.app/api-docs`
2. Teste os endpoints

### Limite de Créditos Gratuitos no Railway

- Railway oferece $5 de crédito grátis por mês
- Para projetos pequenos, isso é suficiente
- Monitore o uso no dashboard

---

## 🔄 Deploy no Cyclic

### Passo 1: Conectar Repositório

1. Acesse: https://cyclic.sh
2. Faça login com GitHub
3. Clique em **"Connect Repository"**
4. Selecione seu repositório
5. O Cyclic detectará automaticamente Node.js

### Passo 2: Configurar Variáveis

1. No dashboard do Cyclic, vá em **"Environment Variables"**
2. Adicione:

   ```
   MONGO_URI = mongodb+srv://ecopontos_user:SUA_SENHA@cluster0.xxxxx.mongodb.net/ecopontos?retryWrites=true&w=majority
   ```

### Passo 3: Deploy

1. O Cyclic fará deploy automático
2. Cada push no GitHub fará um novo deploy automaticamente
3. Sua API estará em: `https://seu-app.cyclic.app`

---

## ✅ Checklist Pós-Deploy

Após fazer o deploy, teste se tudo está funcionando:

- [ ] Acessar a URL da API: `https://seu-app.xxx.com`
- [ ] Verificar documentação Swagger: `https://seu-app.xxx.com/api-docs`
- [ ] Testar POST para criar um ecoponto
- [ ] Testar GET para listar ecopontos
- [ ] Testar GET/:id para buscar um ecoponto específico
- [ ] Testar PUT/:id para atualizar
- [ ] Testar DELETE/:id para remover
- [ ] Verificar logs no painel do serviço

---

## 🐛 Troubleshooting (Solução de Problemas)

### Erro: "MongoDB connection failed"

**Solução:**
- Verifique se a string de conexão está correta
- Confirme que o usuário e senha estão corretos (sem caracteres especiais que precisam ser codificados)
- Verifique se o IP está na whitelist do MongoDB Atlas
- Se a senha tiver caracteres especiais, encode-os (ex: `@` vira `%40`)

### Erro: "Cannot find module"

**Solução:**
- Verifique se todas as dependências estão no `package.json`
- No Render, certifique-se que o build command é `npm install`
- Verifique se não há erros de importação (use `import` e não `require`)

### API não responde após alguns minutos (Render)

**Solução:**
- Render coloca serviços gratuitos em sleep
- Isso é normal no plano gratuito
- Considere usar Railway ou Cyclic para evitar sleeps

### Porta incorreta

**Solução:**
- Render usa porta `10000` internamente, mas mapeia para a URL pública
- Railway fornece `PORT` via variável de ambiente (já configurado no código)
- Cyclic também fornece automaticamente
- O código já está preparado para isso!

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs no painel do serviço escolhido
2. Teste a conexão MongoDB localmente primeiro
3. Verifique se todas as variáveis de ambiente estão configuradas
4. Confirme que o código está funcionando localmente com Docker

---

## 🎉 Pronto!

Sua API está no ar! Compartilhe a URL da documentação Swagger para que outros possam testar.

**URL da Documentação:** `https://seu-app.xxx.com/api-docs`

