# 📝 Exemplos de Requisições para API Ecopontos

Este arquivo contém exemplos prontos para copiar e testar no Postman, Insomnia ou cURL.

## 🌐 URLs Base

- **Local**: `http://localhost:3000/api/ecopontos`
- **Docker**: `http://localhost:3000/api/ecopontos`

## ✅ POST - Criar um Novo Ecoponto

### Endpoint
```
POST /api/ecopontos
```

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
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
  "tipoResiduos": ["papel", "plastico", "vidro", "metal"],
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
  "observacoes": "Aceita grandes volumes de resíduos",
  "ativo": true
}
```

### Exemplo cURL
```bash
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
    "tipoResiduos": ["papel", "plastico", "vidro", "metal"],
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
    "observacoes": "Aceita grandes volumes de resíduos",
    "ativo": true
  }'
```

### Resposta Esperada (201 Created)
```json
{
  "success": true,
  "message": "Ecoponto criado com sucesso!",
  "data": {
    "_id": "64f8a9b2c1e4f5a6b7c8d9e0",
    "nome": "Ecoponto Central",
    "endereco": {
      "rua": "Rua das Flores",
      "numero": "123",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01310-100"
    },
    "tipoResiduos": ["papel", "plastico", "vidro", "metal"],
    "ativo": true,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

---

## 📋 GET - Listar Todos os Ecopontos

### Endpoint
```
GET /api/ecopontos
```

### Exemplo cURL
```bash
curl http://localhost:3000/api/ecopontos
```

### Resposta Esperada (200 OK)
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f8a9b2c1e4f5a6b7c8d9e0",
      "nome": "Ecoponto Central",
      ...
    },
    {
      "_id": "64f8a9b2c1e4f5a6b7c8d9e1",
      "nome": "Ecoponto Norte",
      ...
    }
  ]
}
```

---

## 🔍 GET - Buscar com Filtros

### Filtrar por Cidade
```
GET /api/ecopontos?cidade=São Paulo
```

```bash
curl "http://localhost:3000/api/ecopontos?cidade=São Paulo"
```

### Filtrar por Estado
```
GET /api/ecopontos?estado=SP
```

```bash
curl "http://localhost:3000/api/ecopontos?estado=SP"
```

### Filtrar por Tipo de Resíduo
```
GET /api/ecopontos?tipoResiduo=papel
```

```bash
curl "http://localhost:3000/api/ecopontos?tipoResiduo=papel"
```

### Filtrar por Status (Ativo)
```
GET /api/ecopontos?ativo=true
```

```bash
curl "http://localhost:3000/api/ecopontos?ativo=true"
```

### Múltiplos Filtros
```
GET /api/ecopontos?cidade=São Paulo&estado=SP&ativo=true
```

```bash
curl "http://localhost:3000/api/ecopontos?cidade=São Paulo&estado=SP&ativo=true"
```

---

## 🔎 GET - Buscar Ecoponto por ID

### Endpoint
```
GET /api/ecopontos/:id
```

Substitua `:id` pelo ID real do ecoponto retornado no POST ou GET.

### Exemplo cURL
```bash
curl http://localhost:3000/api/ecopontos/64f8a9b2c1e4f5a6b7c8d9e0
```

### Resposta Esperada (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "64f8a9b2c1e4f5a6b7c8d9e0",
    "nome": "Ecoponto Central",
    "endereco": {
      ...
    },
    ...
  }
}
```

### Resposta se Não Encontrado (404 Not Found)
```json
{
  "success": false,
  "message": "Ecoponto não encontrado"
}
```

---

## ✏️ PUT - Atualizar Ecoponto

### Endpoint
```
PUT /api/ecopontos/:id
```

Substitua `:id` pelo ID real do ecoponto.

### Headers
```
Content-Type: application/json
```

### Body (JSON) - Atualização Parcial
```json
{
  "nome": "Ecoponto Central Atualizado",
  "ativo": false
}
```

### Exemplo cURL
```bash
curl -X PUT http://localhost:3000/api/ecopontos/64f8a9b2c1e4f5a6b7c8d9e0 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ecoponto Central Atualizado",
    "ativo": false
  }'
```

### Resposta Esperada (200 OK)
```json
{
  "success": true,
  "message": "Ecoponto atualizado com sucesso!",
  "data": {
    "_id": "64f8a9b2c1e4f5a6b7c8d9e0",
    "nome": "Ecoponto Central Atualizado",
    "ativo": false,
    "updatedAt": "2025-01-15T11:00:00.000Z",
    ...
  }
}
```

---

## 🗑️ DELETE - Remover Ecoponto

### Endpoint
```
DELETE /api/ecopontos/:id
```

Substitua `:id` pelo ID real do ecoponto.

### Exemplo cURL
```bash
curl -X DELETE http://localhost:3000/api/ecopontos/64f8a9b2c1e4f5a6b7c8d9e0
```

### Resposta Esperada (200 OK)
```json
{
  "success": true,
  "message": "Ecoponto removido com sucesso!",
  "data": {
    "_id": "64f8a9b2c1e4f5a6b7c8d9e0",
    "nome": "Ecoponto Central",
    ...
  }
}
```

---

## ❌ Exemplos de Erros

### Erro de Validação (400 Bad Request)
```json
{
  "success": false,
  "message": "Erro de validação",
  "errors": [
    "O nome do ecoponto é obrigatório",
    "O CEP é obrigatório"
  ]
}
```

### Erro de ID Inválido (400 Bad Request)
```json
{
  "success": false,
  "message": "ID inválido"
}
```

### Erro de Não Encontrado (404 Not Found)
```json
{
  "success": false,
  "message": "Ecoponto não encontrado"
}
```

### Erro de Servidor (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Erro ao criar ecoponto",
  "error": "Detalhes do erro..."
}
```

---

## 📊 Tipos de Resíduos Permitidos

Os seguintes tipos de resíduos são aceitos no array `tipoResiduos`:

- `papel`
- `plastico`
- `vidro`
- `metal`
- `organico`
- `eletronico`
- `pilhas`
- `oleo`

Exemplo:
```json
{
  "tipoResiduos": ["papel", "plastico", "vidro", "metal"]
}
```

---

## 💡 Dicas

1. **ID do MongoDB**: Quando criar um ecoponto, salve o `_id` retornado para usar nas operações GET, PUT e DELETE
2. **Atualização Parcial**: No PUT, você pode enviar apenas os campos que deseja atualizar
3. **Filtros**: Combine múltiplos filtros na query string separados por `&`
4. **Documentação Interativa**: Use `/api-docs` para testar a API diretamente no navegador
5. **Headers**: Sempre inclua `Content-Type: application/json` nas requisições POST e PUT

---

## 🧪 Teste Completo (Sequência)

1. **Criar** um ecoponto (POST)
2. **Listar** todos os ecopontos (GET)
3. **Buscar** o ecoponto criado por ID (GET /:id)
4. **Atualizar** o ecoponto (PUT /:id)
5. **Listar** novamente para ver a atualização (GET)
6. **Deletar** o ecoponto (DELETE /:id)
7. **Verificar** que foi deletado (GET /:id - deve retornar 404)

