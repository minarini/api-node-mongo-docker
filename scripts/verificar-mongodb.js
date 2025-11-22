import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongodb:27017/ecopontos";

async function verificarMongoDB() {
  try {
    console.log("Conectando ao MongoDB...");
    console.log(`URI: ${MONGO_URI.replace(/\/\/.*@/, "//***:***@")}`); // Ocultar credenciais
    
    await mongoose.connect(MONGO_URI);

    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    
    console.log("\nMongoDB conectado com sucesso!");
    console.log(`Banco de dados: ${dbName}`);
    
    // Listar todas as collections
    const collections = await db.listCollections().toArray();
    console.log(`\nCollections encontradas (${collections.length}):`);
    
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   - ${collection.name}: ${count} documento(s)`);
    }
    
    // Verificar especificamente a collection ecopontos
    const ecopontosCollection = collections.find(c => c.name === "ecopontos");
    if (ecopontosCollection) {
      console.log(`\nCollection 'ecopontos' encontrada!`);
      const count = await db.collection("ecopontos").countDocuments();
      console.log(`Total de documentos: ${count}`);
      
      if (count > 0) {
        console.log(`\nPrimeiros 3 documentos:`);
        const docs = await db.collection("ecopontos").find({}).limit(3).toArray();
        docs.forEach((doc, index) => {
          console.log(`\n   ${index + 1}. ID: ${doc._id}`);
          console.log(`      Nome: ${doc.nome}`);
          console.log(`      Cidade: ${doc.endereco?.cidade || "N/A"}`);
          console.log(`      Criado em: ${doc.createdAt || "N/A"}`);
        });
      }
    } else {
      console.log(`\nCollection 'ecopontos' NAO encontrada!`);
      console.log(`   Verifique se você está procurando no banco correto.`);
    }
    
    await mongoose.connection.close();
    console.log("\nConexão fechada.");
    
  } catch (error) {
    console.error("\nErro ao conectar ao MongoDB:", error.message);
    process.exit(1);
  }
}

verificarMongoDB();

