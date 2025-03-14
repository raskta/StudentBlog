import { NextFunction, Request, Response } from "express";
import { userService } from "../service/users.service";

class UserController {
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Endpoints relacionados aos usuários
   */

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Retorna a lista de usuários
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Lista de usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     example: 3
   *                   email:
   *                     type: string
   *                     example: "email1@gmail.com"
   *                   nome:
   *                     type: string
   *                     example: "Professor A"
   *                   role:
   *                     type: string
   *                     example: "Professor"
   *                   ativo:
   *                     type: boolean
   *                     example: true
   *       500:
   *         description: Erro interno do servidor
   */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.get();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Retorna os detalhes de um usuário específico
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Detalhes do usuário
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 3
   *                 email:
   *                   type: string
   *                   example: "email1@gmail.com"
   *                 nome:
   *                   type: string
   *                   example: "Professor A"
   *                 role:
   *                   type: string
   *                   example: "Professor"
   *                 ativo:
   *                   type: boolean
   *                   example: true
   *       404:
   *         message: User com id 1 não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await userService.getById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 example: "Fulano"
   *               email:
   *                 type: string
   *                 example: "email@gmail.com"
   *               role:
   *                 type: string
   *                 example: "Aluno"
   *               ativo:
   *                 type: boolean
   *                 example: true
   *     responses:
   *       200:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 5
   *                 nome:
   *                   type: string
   *                   example: "Fulano"
   *                 email:
   *                   type: string
   *                   example: "email@gmail.com"
   *                 role:
   *                   type: string
   *                   example: "Aluno"
   *                 ativo:
   *                   type: boolean
   *                   example: true
   *       400:
   *         message: email é obrigatório
   *       500:
   *         description: Erro interno do servidor
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "email é obrigatório" });
      }
      const result = await userService.create(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Atualiza um usuário existente
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário a ser atualizado
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 example: "Fulano Atualizado"
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 5
   *                 email:
   *                   type: string
   *                   example: "email@gmail.com"
   *                 nome:
   *                   type: string
   *                   example: "Fulano Atualizado"
   *                 role:
   *                   type: string
   *                   example: "Aluno"
   *                 ativo:
   *                   type: boolean
   *                   example: true
   *       404:
   *         description: Usuário não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await userService.update(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Exclui um usuário pelo ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário a ser excluído
   *     responses:
   *       200:
   *         description: Usuário excluído com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Usuário com id 5 deletado com sucesso"
   *       404:
   *         description: Usuário não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await userService.delete(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
