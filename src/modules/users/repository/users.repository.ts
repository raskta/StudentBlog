import AppDataSource from "../../../config/data-source";
import { User } from "../models/users.models";

export const userRepository = AppDataSource.getRepository(User);