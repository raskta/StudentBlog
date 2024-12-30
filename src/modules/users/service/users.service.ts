import { CustomError } from "../../../utils/error/custom.error";
import { UserDto } from "../dto/users.dto";
import { createUser, getUserByEmail, getUserById, getUsers } from "../repository/users.repository";

class UserService {
  async get() {
    const users = await getUsers();
    return users;
  }

  async getById(id: number) {
    const post = await getUserById(id);
    if (!post) {
      throw new CustomError(`Post com id ${id} não encontrado`, 404);
    }
    return post;
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
}

export const userService = new UserService();
