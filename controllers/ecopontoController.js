import * as ecopontoService from "../services/ecopontoService.js";

/**
 * Controller Layer - Lógica de controle HTTP (Request/Response)
 * Responsável por receber requisições, chamar services e retornar respostas
 */

/**
 * Criar um novo ecoponto
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
export const criarEcoponto = async (req, res) => {
  try {
    console.log("\nRecebendo requisição para criar ecoponto...");
    console.log("Dados recebidos:", JSON.stringify(req.body, null, 2));
    
    const ecopontoSalvo = await ecopontoService.criarEcoponto(req.body);
    
    console.log("Resposta sendo enviada ao cliente");
    
    res.status(201).json({
      success: true,
      message: "Ecoponto criado com sucesso!",
      data: ecopontoSalvo
    });
  } catch (error) {
    console.error("Erro ao criar ecoponto:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Erro de validação",
        errors: errors
      });
    }
    res.status(500).json({
      success: false,
      message: "Erro ao criar ecoponto",
      error: error.message
    });
  }
};

/**
 * Listar todos os ecopontos com filtros opcionais
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
export const listarEcopontos = async (req, res) => {
  try {
    const ecopontos = await ecopontoService.listarEcopontos(req.query);
    res.status(200).json({
      success: true,
      count: ecopontos.length,
      data: ecopontos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar ecopontos",
      error: error.message
    });
  }
};

/**
 * Buscar um ecoponto por ID
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
export const buscarEcopontoPorId = async (req, res) => {
  try {
    const ecoponto = await ecopontoService.buscarEcopontoPorId(req.params.id);
    
    if (!ecoponto) {
      return res.status(404).json({
        success: false,
        message: "Ecoponto não encontrado"
      });
    }

    res.status(200).json({
      success: true,
      data: ecoponto
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }
    res.status(500).json({
      success: false,
      message: "Erro ao buscar ecoponto",
      error: error.message
    });
  }
};

/**
 * Atualizar um ecoponto existente
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
export const atualizarEcoponto = async (req, res) => {
  try {
    const ecopontoAtualizado = await ecopontoService.atualizarEcoponto(
      req.params.id,
      req.body
    );

    if (!ecopontoAtualizado) {
      return res.status(404).json({
        success: false,
        message: "Ecoponto não encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Ecoponto atualizado com sucesso!",
      data: ecopontoAtualizado
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Erro de validação",
        errors: errors
      });
    }
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar ecoponto",
      error: error.message
    });
  }
};

/**
 * Remover um ecoponto
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
export const removerEcoponto = async (req, res) => {
  try {
    const ecopontoRemovido = await ecopontoService.removerEcoponto(req.params.id);

    if (!ecopontoRemovido) {
      return res.status(404).json({
        success: false,
        message: "Ecoponto não encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Ecoponto removido com sucesso!",
      data: ecopontoRemovido
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }
    res.status(500).json({
      success: false,
      message: "Erro ao remover ecoponto",
      error: error.message
    });
  }
};

