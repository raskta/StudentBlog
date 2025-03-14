import { NextFunction, Request, Response } from "express";
import { postService } from "../service/posts.service";
import { CustomError } from "../../../shared/error/custom.error";

class PostController {
  /**
   * @swagger
   * tags:
   *   name: Posts
   *   description: Endpoints relacionados a posts
   */

  /**
   * @swagger
   * /posts:
   *   get:
   *     summary: Retorna a lista de posts
   *     tags: [Posts]
   *     responses:
   *       200:
   *         description: Lista de posts
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
   *                   titulo:
   *                     type: string
   *                     example: "Post 1"
   *                   subtitulo:
   *                     type: string
   *                     example: "Subtítulo 1"
   *                   conteudo:
   *                     type: string
   *                     example: "Conteúdo do Post 1"
   *                   urlimagem:
   *                     type: string
   *                     nullable: true
   *                     example: null
   *                   dtcriacao:
   *                     type: string
   *                     format: date-time
   *                     example: "2024-12-30T16:17:38.808Z"
   *                   dtalteracao:
   *                     type: string
   *                     format: date-time
   *                     example: "2024-12-30T16:17:38.808Z"
   *                   usuario:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         example: 3
   *                       email:
   *                         type: string
   *                         example: "email1@gmail.com"
   *                       nome:
   *                         type: string
   *                         example: "Professor A"
   *                       role:
   *                         type: string
   *                         example: "Professor"
   *                       ativo:
   *                         type: boolean
   *                         example: true
   *                   usuarioAlteracao:
   *                     type: object
   *                     nullable: true
   *                     example: null
   */
  async get(req: Request, res: Response) {
    try {
      const result = await postService.get();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar posts" });
    }
  }

  /**
   * @swagger
   * /posts/{id}:
   *   get:
   *     summary: Retorna um post específico pelo ID
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do post
   *     responses:
   *       200:
   *         description: Detalhes do post
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 3
   *                 titulo:
   *                   type: string
   *                   example: "Post 1"
   *                 subtitulo:
   *                   type: string
   *                   example: "Subtítulo 1"
   *                 conteudo:
   *                   type: string
   *                   example: "Conteúdo do Post 1"
   *                 urlimagem:
   *                   type: string
   *                   nullable: true
   *                   example: null
   *                 dtcriacao:
   *                   type: string
   *                   format: date-time
   *                   example: "2024-12-30T16:17:38.808Z"
   *                 dtalteracao:
   *                   type: string
   *                   format: date-time
   *                   example: "2024-12-30T16:17:38.808Z"
   *                 usuario:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 3
   *                     email:
   *                       type: string
   *                       example: "email1@gmail.com"
   *                     nome:
   *                       type: string
   *                       example: "Professor A"
   *                     role:
   *                       type: string
   *                       example: "Professor"
   *                     ativo:
   *                       type: boolean
   *                       example: true
   *                 usuarioAlteracao:
   *                   type: object
   *                   nullable: true
   *                   example: null
   *       404:
   *         description: Post não encontrado
   */
  async getbyId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await postService.getById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /posts/search:
   *   get:
   *     summary: Busca posts por palavra-chave
   *     tags: [Posts]
   *     parameters:
   *       - in: query
   *         name: keyword
   *         required: true
   *         schema:
   *           type: string
   *         description: Palavra-chave para buscar nos títulos e conteúdos dos posts
   *     responses:
   *       200:
   *         description: Lista de posts que correspondem à palavra-chave
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
   *                   titulo:
   *                     type: string
   *                     example: "Post 1"
   *                   subtitulo:
   *                     type: string
   *                     example: "Subtítulo 1"
   *                   conteudo:
   *                     type: string
   *                     example: "Conteúdo do Post 1"
   *                   urlimagem:
   *                     type: string
   *                     nullable: true
   *                     example: null
   *                   dtcriacao:
   *                     type: string
   *                     format: date-time
   *                     example: "2024-12-30T16:17:38.808Z"
   *                   dtalteracao:
   *                     type: string
   *                     format: date-time
   *                     example: "2024-12-30T16:17:38.808Z"
   *       400:
   *         description: Parâmetro keyword é inválido ou ausente
   *       500:
   *         description: Erro interno do servidor
   */
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { keyword } = req.query;
      if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
        throw new CustomError(
          "O parâmetro 'keyword' é obrigatório e deve ser uma string válida!",
          400
        );
      }
      const result = await postService.search(String(keyword));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /posts:
   *   post:
   *     summary: Cria um novo post
   *     tags: [Posts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               titulo:
   *                 type: string
   *                 example: "Novo Post"
   *               subtitulo:
   *                 type: string
   *                 example: "Subtítulo do Novo Post"
   *               conteudo:
   *                 type: string
   *                 example: "Este é o conteúdo do novo post."
   *               urlimagem:
   *                 type: string
   *                 nullable: true
   *                 example: null
   *               idusuario:
   *                 type: integer
   *                 example: 3
   *     responses:
   *       200:
   *         description: Post criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 6
   *                 titulo:
   *                   type: string
   *                   example: "Novo Post"
   *                 subtitulo:
   *                   type: string
   *                   example: "Subtítulo do Novo Post"
   *                 conteudo:
   *                   type: string
   *                   example: "Este é o conteúdo do novo post."
   *                 urlimagem:
   *                   type: string
   *                   nullable: true
   *                   example: null
   *                 usuario:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 3
   *                     email:
   *                       type: string
   *                       example: "email1@gmail.com"
   *                     nome:
   *                       type: string
   *                       example: "Professor A"
   *                     role:
   *                       type: string
   *                       example: "Professor"
   *                     ativo:
   *                       type: boolean
   *                       example: true
   *                 dtcriacao:
   *                   type: string
   *                   format: date-time
   *                   example: "2025-01-06T19:34:22.669Z"
   *                 dtalteracao:
   *                   type: string
   *                   format: date-time
   *                   example: "2025-01-06T19:34:22.669Z"
   *       500:
   *         description: Erro interno do servidor
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      
      const { idusuario } = req.body;
      if (!idusuario) {
        return res.status(400).json({ message: "idusuario é obrigatório" });
      }
      if (req.body.imagem && !req.body.urlimagem) {
        req.body.urlimagem = req.body.imagem;
        delete req.body.imagem;
      }
      const result = await postService.create(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /posts/{id}:
   *   put:
   *     summary: Atualiza um post existente
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do post a ser atualizado
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               titulo:
   *                 type: string
   *                 example: "Alterando o título"
   *               subtitulo:
   *                 type: string
   *                 example: "Alterando Subtítulo"
   *               conteudo:
   *                 type: string
   *                 example: "Conteúdo do Post"
   *               urlimagem:
   *                 type: string
   *                 nullable: true
   *                 example: null
   *               dtcriacao:
   *                 type: string
   *                 format: date-time
   *                 example: "2024-12-27T03:02:12.450Z"
   *               dtalteracao:
   *                 type: string
   *                 format: date-time
   *                 example: "2024-12-27T03:02:12.450Z"
   *               usuario:
   *                 type: integer
   *                 example: 3
   *               usuarioAlteracao:
   *                 type: integer
   *                 example: 3
   *     responses:
   *       200:
   *         description: Post atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 6
   *                 titulo:
   *                   type: string
   *                   example: "Alterando o título"
   *                 subtitulo:
   *                   type: string
   *                   example: "Alterando Subtítulo"
   *                 conteudo:
   *                   type: string
   *                   example: "Conteúdo do Post"
   *                 urlimagem:
   *                   type: string
   *                   nullable: true
   *                   example: null
   *                 dtcriacao:
   *                   type: string
   *                   format: date-time
   *                   example: "2024-12-27T03:02:12.450Z"
   *                 dtalteracao:
   *                   type: string
   *                   format: date-time
   *                   example: "2024-12-27T03:02:12.450Z"
   *                 usuario:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 3
   *                     email:
   *                       type: string
   *                       example: "email1@gmail.com"
   *                     nome:
   *                       type: string
   *                       example: "Professor A"
   *                     role:
   *                       type: string
   *                       example: "Professor"
   *                     ativo:
   *                       type: boolean
   *                       example: true
   *                 usuarioAlteracao:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 3
   *                     email:
   *                       type: string
   *                       example: "email1@gmail.com"
   *                     nome:
   *                       type: string
   *                       example: "Professor A"
   *                     role:
   *                       type: string
   *                       example: "Professor"
   *                     ativo:
   *                       type: boolean
   *                       example: true
   *       404:
   *         description: Post não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await postService.update(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /posts/{id}:
   *   delete:
   *     summary: Remove um post pelo ID
   *     tags: [Posts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do post a ser removido
   *     responses:
   *       200:
   *         description: Post deletado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Post com id 6 deletado com sucesso"
   *       404:
   *         description: Post não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await postService.delete(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const postController = new PostController();
