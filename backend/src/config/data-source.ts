import { DataSource } from "typeorm";
import { Post } from "../modules/posts/models/posts.models";
import { User } from "../modules/users/models/users.models";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // Cria as tabelas automaticamente
  logging: false,
  entities: [Post, User],
});

export const initDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected on port:", process.env.DB_PORT);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default AppDataSource;
