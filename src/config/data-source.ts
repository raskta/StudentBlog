import { DataSource } from 'typeorm';
import { Post } from '../modules/posts/models/posts.models';
import { User } from '../modules/users/models/users.models';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // Cria as tabelas automaticamente
  entities: [Post, User],
});

export default AppDataSource;