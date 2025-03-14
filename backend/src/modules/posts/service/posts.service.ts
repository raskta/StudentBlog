import { CustomError } from "../../../shared/error/custom.error";
import { getUserById } from "../../users/repository/users.repository";
import { PostDTO } from "../dto/posts.dto";
import {
  deletePost,
  getPost,
  postCreate,
  postGetById,
  postUpdate,
  searchPosts,
} from "../repository/posts.repository";

class PostService {
  async get() {
    const posts = await getPost();
    return posts;
  }

  async getById(id: number) {
    const post = await postGetById(id);
    if (!post) {
      throw new CustomError(`Post com id ${id} não encontrado`, 404);
    }
    return post;
  }

  async create(post: PostDTO) {
    const userData = await getUserById(post.idusuario);
    if (!userData) {
      throw new CustomError(`Usuário com id ${post.idusuario} não existe`, 400);
    }

    if (!post.titulo || !post.conteudo) {
      throw new CustomError("Título e conteúdo são obrigatórios", 400);
    }    

    const newPost = await postCreate({ ...post, usuario: userData });
    return newPost;
  }

  async update(id: number, post: PostDTO) {
    await this.getById(id);
    const updatedPost = await postUpdate(id, post);
    return updatedPost;
  }

  async delete(id: number) {
    await this.getById(id);
    await deletePost(id);
    return { message: `Post com id ${id} deletado com sucesso` };
  }

  async search(keyword: string) {
   
    const posts = await searchPosts(keyword.trim());
    if (!posts.length) {
      return { message: `Nenhum post encontrado com o termo ${keyword}` };
    }
    return posts;
  }
}

export const postService = new PostService();
