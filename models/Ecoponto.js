import mongoose from "mongoose";

const ecopontoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome do ecoponto é obrigatório"],
    trim: true,
    minlength: [3, "O nome deve ter no mínimo 3 caracteres"]
  },
  endereco: {
    rua: {
      type: String,
      required: [true, "A rua é obrigatória"],
      trim: true
    },
    numero: {
      type: String,
      required: [true, "O número é obrigatório"],
      trim: true
    },
    bairro: {
      type: String,
      required: [true, "O bairro é obrigatório"],
      trim: true
    },
    cidade: {
      type: String,
      required: [true, "A cidade é obrigatória"],
      trim: true
    },
    estado: {
      type: String,
      required: [true, "O estado é obrigatório"],
      trim: true,
      uppercase: true,
      minlength: [2, "O estado deve ter 2 caracteres"],
      maxlength: [2, "O estado deve ter 2 caracteres"]
    },
    cep: {
      type: String,
      required: [true, "O CEP é obrigatório"],
      trim: true,
      match: [/^\d{5}-?\d{3}$/, "CEP inválido"]
    }
  },
  tipoResiduos: {
    type: [String],
    required: [true, "É necessário informar pelo menos um tipo de resíduo"],
    enum: {
      values: ["papel", "plastico", "vidro", "metal", "organico", "eletronico", "pilhas", "oleo"],
      message: "Tipo de resíduo inválido"
    }
  },
  horarioFuncionamento: {
    segunda: { type: String, default: "Fechado" },
    terca: { type: String, default: "Fechado" },
    quarta: { type: String, default: "Fechado" },
    quinta: { type: String, default: "Fechado" },
    sexta: { type: String, default: "Fechado" },
    sabado: { type: String, default: "Fechado" },
    domingo: { type: String, default: "Fechado" }
  },
  coordenadas: {
    latitude: {
      type: Number,
      required: false,
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      required: false,
      min: -180,
      max: 180
    }
  },
  ativo: {
    type: Boolean,
    default: true
  },
  telefone: {
    type: String,
    required: false,
    trim: true
  },
  observacoes: {
    type: String,
    required: false,
    trim: true,
    maxlength: [500, "Observações não podem ter mais de 500 caracteres"]
  }
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  versionKey: false // Remove o campo __v
});

// Índices para melhorar performance de consultas
ecopontoSchema.index({ "endereco.cidade": 1, "endereco.estado": 1 });
ecopontoSchema.index({ ativo: 1 });
ecopontoSchema.index({ tipoResiduos: 1 });

// Definir explicitamente o nome da collection como "ecopontos" (plural)
// O Mongoose pluraliza automaticamente, mas é bom deixar explícito
export default mongoose.model("Ecoponto", ecopontoSchema, "ecopontos");

