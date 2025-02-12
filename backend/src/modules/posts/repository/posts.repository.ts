import { Like } from 'typeorm/find-options/operator/Like';
import AppDataSource from '../../../config/data-source';
import { Post } from '../models/posts.models';

export const postRepository = AppDataSource.getRepository(Post);

export const getPost = async (): Promise<Post[]> => {
  const posts = await postRepository.find({
    relations: ["usuario", "usuarioAlteracao"],
  });
  return posts;
};

export const postGetById = async (id: number): Promise<Post | null> => {
  return await postRepository.findOne({
    where: { id },
    relations: ['usuario', 'usuarioAlteracao'],
  });
};

export const postCreate = async (post: Partial<Post>): Promise<Post> => {
  const newPost = postRepository.create(post);
  await postRepository.save(newPost);
  return newPost;
};

export const postUpdate = async (id: number, post: Partial<Post>): Promise<Post | null> => {
  await postRepository.update(id, post);
  return await postGetById(id);
};

export const deletePost = async (id: number): Promise<void> => {
  await postRepository.delete(id);
};

export const searchPosts = async (keyword: string): Promise<Post[]> => {
  return await postRepository.find({
    where: [
      { titulo: Like(`%${keyword}%`) },
      { subtitulo: Like(`%${keyword}%`) },
      { conteudo: Like(`%${keyword}%`) }
    ]
  });
};

