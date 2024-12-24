import { Request, Response } from 'express';
import { postService } from '../service/posts.service';

class PostController{
    async get(req: Request, res: Response){
        try {
            const result = await postService.get();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar posts' });
        }
    }
}

export const postController = new PostController();