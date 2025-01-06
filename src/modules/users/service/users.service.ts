import { CustomError } from "../../../shared/error/custom.error";
import { UserDto } from "../dto/users.dto";
import { createUser, deleteUser, getUserByEmail, getUserById, getUsers, updateUser } from "../repository/users.repository";

class UserService {
  async get() {
    const users = await getUsers();
    return users;
  }

  async getById(id: number) {
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(`User com id ${id} não encontrado`, 404);
    }
    return user;
  }

  async getByEmail(email: string) {
    const post = await getUserByEmail(email);
    if (!post) {
      throw new CustomError(`Usuário com email ${email} não encontrado`, 404);
    }
    return post;
  }

  async create(user: UserDto) {
    const userData = await this.getByEmail(user.email);
    if(userData){
        throw new CustomError(`Usuário com email ${user.email} já existe`, 400);
    }
    const newUser = await createUser(user);
    return newUser;
  }

  async update(id: number, user: UserDto) {
    await this.getById(id);
    const updatedUser = await updateUser(id,user);
    return updatedUser;
  }

  async delete(id: number) {
    await this.getById(id);
    await deleteUser(id);
    return { message: `Usuário com id ${id} deletado com sucesso` };
  }
}

export const userService = new UserService();
