import { Request, Response } from 'express';
import { postService } from '../service/posts.service';

class PostController{
    async get(req: Request, res: Response){
        const result = await postService.get();
        res.send(result);
    }
}

export const postController = new PostController();