import Ecoponto from "../models/Ecoponto.js";
import mongoose from "mongoose";

/**
 * Service Layer - Lógica de acesso aos dados (Repository Pattern)
 * Responsável por todas as operações com o banco de dados
 */

/**
 * Criar um novo ecoponto
 * @param {Object} ecopontoData - Dados do ecoponto a ser criado
 * @returns {Promise<Object>} Ecoponto criado
 */
export const criarEcoponto = async (ecopontoData) => {
  const novoEcoponto = new Ecoponto(ecopontoData);
  const ecopontoSalvo = await novoEcoponto.save();
  
  // Log detalhado para debug
  const dbName = mongoose.connection.db?.databaseName || "desconhecido";
  const collectionName = novoEcoponto.collection.name;
  
  console.log("\nEcoponto criado com sucesso!");
  console.log(`Banco de dados: ${dbName}`);
  console.log(`Collection: ${collectionName}`);
  console.log(`ID do documento: ${ecopontoSalvo._id}`);
  console.log(`Nome: ${ecopontoSalvo.nome}`);
  
  return ecopontoSalvo;
};

/**
 * Buscar todos os ecopontos com filtros opcionais
 * @param {Object} filtros - Filtros de busca (cidade, estado, tipoResiduo, ativo)
 * @returns {Promise<Array>} Lista de ecopontos
 */
export const listarEcopontos = async (filtros = {}) => {
  const { cidade, estado, tipoResiduo, ativo } = filtros;
  const filtro = {};

  // Construir filtro dinâmico
  if (cidade) filtro["endereco.cidade"] = new RegExp(cidade, "i");
  if (estado) filtro["endereco.estado"] = estado.toUpperCase();
  if (tipoResiduo) filtro.tipoResiduos = tipoResiduo;
  if (ativo !== undefined) filtro.ativo = ativo === "true";

  return await Ecoponto.find(filtro).sort({ createdAt: -1 });
};

/**
 * Buscar um ecoponto por ID
 * @param {String} id - ID do ecoponto
 * @returns {Promise<Object|null>} Ecoponto encontrado ou null
 */
export const buscarEcopontoPorId = async (id) => {
  return await Ecoponto.findById(id);
};

/**
 * Atualizar um ecoponto existente
 * @param {String} id - ID do ecoponto
 * @param {Object} dadosAtualizacao - Dados a serem atualizados
 * @returns {Promise<Object|null>} Ecoponto atualizado ou null
 */
export const atualizarEcoponto = async (id, dadosAtualizacao) => {
  return await Ecoponto.findByIdAndUpdate(
    id,
    dadosAtualizacao,
    {
      new: true, // Retorna o documento atualizado
      runValidators: true // Executa validações do schema
    }
  );
};

/**
 * Remover um ecoponto
 * @param {String} id - ID do ecoponto
 * @returns {Promise<Object|null>} Ecoponto removido ou null
 */
export const removerEcoponto = async (id) => {
  return await Ecoponto.findByIdAndDelete(id);
};

