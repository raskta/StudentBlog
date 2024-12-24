import AppDataSource from '../../../config/data-source';
import { Post } from '../models/posts.models';

export const getRepository = AppDataSource.getRepository(Post);