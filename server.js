import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import ecopontoRoutes from "./routes/ecopontoRoutes.js";

dotenv.config(); // Carrega variáveis do .env

const app = express();

app.use(cors()); // permite todas as origens por padrão
app.use(express.json());

// Conexão com MongoDB
const mongoUrl = process.env.MONGO_URL;
console.log("\nTentando conectar ao MongoDB...");

if (!mongoUrl) {
  console.error("ERRO: a variável de ambiente MONGO_URL não está definida!");
  process.exit(1); // encerra o processo se a URL não estiver definida
}

console.log(`MONGO_URL: ${mongoUrl.replace(/\/\/.*@/, "//***:***@")}`);

mongoose.connect(mongoUrl)
  .then(async () => {
    const dbName = mongoose.connection.db.databaseName;
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name).join(", ");

    console.log("\nMongoDB conectado com sucesso!");
    console.log(`Banco de dados: ${dbName}`);
    console.log(`Collections existentes: ${collectionNames || "nenhuma"}`);
    console.log(`Collection usada pelo modelo Ecoponto: ecopontos`);

    const ecopontosCollection = collections.find(c => c.name === "ecopontos");
    if (ecopontosCollection) {
      const count = await mongoose.connection.db.collection("ecopontos").countDocuments();
      console.log(`Documentos na collection 'ecopontos': ${count}\n`);
    } else {
      console.log(`Collection 'ecopontos' ainda não existe. Será criada quando o primeiro documento for salvo.\n`);
    }
  })
  .catch(err => {
    console.error("\nErro ao conectar MongoDB:", err);
    console.error("Verifique se o MongoDB está rodando e se a URI está correta.\n");
    process.exit(1); // encerra o processo se não conseguir conectar
  });

// Configuração do Swagger
const PORT = process.env.PORT || 3000;
// Detecta automaticamente a URL base (útil para Render, Railway, etc)
const getBaseUrl = () => {
  if (process.env.API_URL) return process.env.API_URL;
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL;
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  return `http://localhost:${PORT}`;
};
const API_URL = getBaseUrl();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Ecopontos",
      version: "1.0.0",
      description: "API para gerenciamento de ecopontos - pontos de coleta seletiva",
      contact: { name: "Suporte API" },
    },
    servers: [
      { url: API_URL, description: "Servidor atual" },
    ],
    components: {
      schemas: {
        Ecoponto: {
          type: "object",
          required: ["nome", "endereco", "tipoResiduos"],
          properties: {
            nome: { type: "string", example: "Ecoponto Central" },
            endereco: {
              type: "object",
              required: ["rua","numero","bairro","cidade","estado","cep"],
              properties: {
                rua: { type: "string", example: "Rua das Flores" },
                numero: { type: "string", example: "123" },
                bairro: { type: "string", example: "Centro" },
                cidade: { type: "string", example: "São Paulo" },
                estado: { type: "string", example: "SP" },
                cep: { type: "string", example: "01310-100" },
              },
            },
            tipoResiduos: {
              type: "array",
              items: { type: "string", enum: ["papel","plastico","vidro","metal","organico","eletronico","pilhas","oleo"] },
              example: ["papel","plastico","vidro"],
            },
            horarioFuncionamento: {
              type: "object",
              properties: {
                segunda: { type: "string", example: "08:00 - 18:00" },
                terca: { type: "string", example: "08:00 - 18:00" },
                quarta: { type: "string", example: "08:00 - 18:00" },
                quinta: { type: "string", example: "08:00 - 18:00" },
                sexta: { type: "string", example: "08:00 - 18:00" },
                sabado: { type: "string", example: "08:00 - 12:00" },
                domingo: { type: "string", example: "Fechado" },
              },
            },
            coordenadas: {
              type: "object",
              properties: {
                latitude: { type: "number", example: -23.5505 },
                longitude: { type: "number", example: -46.6333 },
              },
            },
            ativo: { type: "boolean", default: true },
            telefone: { type: "string", example: "(11) 1234-5678" },
            observacoes: { type: "string", example: "Aceita grandes volumes de resíduos" },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            errors: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./server.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API Ecopontos - Documentação",
}));

// Rotas
app.use("/api/ecopontos", ecopontoRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    message: "API Ecopontos - Documentação disponível em /api-docs",
    endpoints: { ecopontos: "/api/ecopontos", documentacao: "/api-docs" },
  });
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em ${API_URL}/api-docs`);
});
