import AppDataSource from '../../config/data-source';
import { Post } from '../../modules/posts/models/posts.models';
import { User } from '../../modules/users/models/users.models';

const seedDatabase = async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);

  // Criar usuários fictícios
  const user1 = userRepository.create({ nome: 'Professor A', role: 'Professor', ativo: true });
  const user2 = userRepository.create({ nome: 'Aluno B', role: 'Aluno', ativo: true });
  await userRepository.save([user1, user2]);

  // Criar posts fictícios
  const post1 = postRepository.create({
    titulo: 'Post 1',
    subtitulo: 'Subtítulo 1',
    conteudo: 'Conteúdo do Post 1',
    usuario: user1,
  });

  const post2 = postRepository.create({
    titulo: 'Post 2',
    subtitulo: 'Subtítulo 2',
    conteudo: 'Conteúdo do Post 2',
    usuario: user2,
  });

  await postRepository.save([post1, post2]);

  console.log('Seed executado com sucesso!');
  await AppDataSource.destroy();
};

seedDatabase().catch((err) => console.error(err));
