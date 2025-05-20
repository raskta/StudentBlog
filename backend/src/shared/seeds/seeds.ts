import AppDataSource from "../../config/data-source";
import { Post } from "../../modules/posts/models/posts.models";
import { User } from "../../modules/users/models/users.models";

import "dotenv/config";

const seedDatabase = async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);

  // Limpar tabelas antes de inserir novos dados
  await postRepository.delete({}); // Remove todos os posts
  await userRepository.delete({}); // Remove todos os usuários

  // Criar usuários fictícios
  const user1 = userRepository.create({
    nome: "Professor A",
    role: "Professor",
    ativo: true,
    email: "email1@gmail.com",
  });
  const user2 = userRepository.create({
    nome: "Professor B",
    role: "Professor",
    ativo: true,
    email: "email2@gmail.com",
  });
  await userRepository.save([user1, user2]);

  // Criar posts fictícios
  const post1 = postRepository.create({
    titulo: "Post 1",
    subtitulo: "Subtítulo 1",
    conteudo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    usuario: user1,
    urlimagem:
      "https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg",
  });

  const post2 = postRepository.create({
    titulo: "Post 2",
    subtitulo:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Natoque consectetur per eros rhoncus arcu. Condimentum porttitor convallis blandit consectetur pretium tellus dis.",
    conteudo:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Adipiscing velit quisque lacus aliquam risus magnis consectetur. Proin adipiscing mattis imperdiet mattis, cursus tortor maecenas curabitur quis. Tempor id cras bibendum curabitur parturient nisi laoreet imperdiet ipsum. Eu torquent blandit vel consequat velit morbi platea facilisis. Congue ligula tellus, velit porttitor proin pulvinar scelerisque. Blandit duis congue dolor varius placerat arcu ultrices commodo. Velit magnis dapibus pellentesque ullamcorper litora. Ultricies in ultrices fermentum elit natoque lacus urna ligula rhoncus. Curabitur lacinia a orci facilisis himenaeos primis donec. Congue aptent at integer amet nunc finibus tristique lobortis. Maecenas purus aliquet aliquet tortor pellentesque; laoreet accumsan habitasse. Class montes vehicula dictum tortor lacinia posuere eu? Nullam pretium ultrices vehicula natoque dignissim nullam habitant. Orci varius bibendum quisque nulla cubilia dolor magna penatibus. Ullamcorper diam taciti dictumst sodales enim pellentesque ultricies molestie himenaeos. Tortor enim tellus accumsan ut congue mattis tellus. Maecenas proin vulputate dis fames id primis justo. Suscipit aptent curae habitasse praesent vivamus inceptos egestas natoque. Vel tristique quam feugiat morbi molestie id venenatis. Congue curae inceptos suscipit laoreet orci auctor ex quis conubia. Sagittis quam imperdiet viverra sociosqu quis quisque.",
    usuario: user2,
  });

  await postRepository.save([post1, post2]);

  console.log("Seed executado com sucesso!");
  await AppDataSource.destroy();
};

seedDatabase().catch((err) => console.error(err));
