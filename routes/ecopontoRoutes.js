import express from "express";
import * as ecopontoController from "../controllers/ecopontoController.js";

const router = express.Router();

/**
 * @swagger
 * /api/ecopontos:
 *   post:
 *     summary: Criar um novo ecoponto
 *     tags: [Ecopontos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ecoponto'
 *     responses:
 *       201:
 *         description: Ecoponto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Ecoponto'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", ecopontoController.criarEcoponto);

/**
 * @swagger
 * /api/ecopontos:
 *   get:
 *     summary: Listar todos os ecopontos
 *     tags: [Ecopontos]
 *     parameters:
 *       - in: query
 *         name: cidade
 *         schema:
 *           type: string
 *         description: Filtrar por cidade
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Filtrar por estado. Exemplos SP, RJ
 *       - in: query
 *         name: tipoResiduo
 *         schema:
 *           type: string
 *           enum: [papel, plastico, vidro, metal, organico, eletronico, pilhas, oleo]
 *         description: Filtrar por tipo de resíduo
 *       - in: query
 *         name: ativo
 *         schema:
 *           type: boolean
 *         description: Filtrar por status (true/false)
 *     responses:
 *       200:
 *         description: Lista de ecopontos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ecoponto'
 */
router.get("/", ecopontoController.listarEcopontos);

/**
 * @swagger
 * /api/ecopontos/{id}:
 *   get:
 *     summary: Buscar um ecoponto específico por ID
 *     tags: [Ecopontos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do ecoponto
 *     responses:
 *       200:
 *         description: Ecoponto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Ecoponto'
 *       404:
 *         description: Ecoponto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", ecopontoController.buscarEcopontoPorId);

/**
 * @swagger
 * /api/ecopontos/{id}:
 *   put:
 *     summary: Atualizar um ecoponto existente
 *     tags: [Ecopontos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do ecoponto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ecoponto'
 *     responses:
 *       200:
 *         description: Ecoponto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Ecoponto'
 *       404:
 *         description: Ecoponto não encontrado
 *       400:
 *         description: Erro de validação
 */
router.put("/:id", ecopontoController.atualizarEcoponto);

/**
 * @swagger
 * /api/ecopontos/{id}:
 *   delete:
 *     summary: Remover um ecoponto
 *     tags: [Ecopontos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do ecoponto
 *     responses:
 *       200:
 *         description: Ecoponto removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Ecoponto'
 *       404:
 *         description: Ecoponto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", ecopontoController.removerEcoponto);

export default router;
