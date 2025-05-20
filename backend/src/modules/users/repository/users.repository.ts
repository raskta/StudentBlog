import AppDataSource from "../../../config/data-source";
import { Post } from "../../posts/models/posts.models";
import { postRepository } from "../../posts/repository/posts.repository";
import { User } from "../models/users.models";

export const userRepository = AppDataSource.getRepository(User);

// Buscar todos os usuários
export const getUsers = async (): Promise<User[]> => {
  return await userRepository.find({});
};

// Buscar um usuário por ID
export const getUserById = async (id: number): Promise<User | null> => {
  return await userRepository.findOne({
    where: { id },
  });
};

// Buscar um usuário por email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await userRepository.findOne({
    where: { email },
  });
};

// Criar um novo usuário
export const createUser = async (user: User): Promise<User> => {
  const newUser = userRepository.create(user);
  await userRepository.save(newUser);
  return newUser;
};

// Atualizar um usuário existente
export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<User | null> => {
  await userRepository.update(id, user);
  return await getUserById(id);
};

// Excluir um usuário e desvincular posts
export const deleteUserAndUnlinkPosts = async (id: number): Promise<void> => {
  // Desvincular os posts: coloca usuario = null (coluna usuario vira NULL)
  await postRepository
    .createQueryBuilder()
    .update(Post)
    .set({ usuario: null })
    .where("idusuario = :id", { id })
    .execute();

  // Apagar o usuário
  await userRepository.delete(id);
};
