import { CustomError } from "../../../utils/error/custom.error";
import { getUserById } from "../../users/repository/users.repository";
import { PostDTO } from "../dto/posts.dto";
import { Post } from "../models/posts.models";
import {
  getPost,
  postCreate,
  postGetById,
  postUpdate,
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
    
    const newPost = await postCreate({...post,usuario:userData});
    return newPost;
  }

  async update(id: number, post: PostDTO) {
    await this.getById(id);
    const updatedPost = await postUpdate(id, post);
    return updatedPost;
  }
}

export const postService = new PostService();
