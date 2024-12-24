import { getRepository } from '../repository/posts.repository';

class PostService{
    async get(){
        const posts = await getRepository.find({ relations: ['usuario', 'usuarioAlteracao'] });
        return posts;
    }
}

export const postService = new PostService();