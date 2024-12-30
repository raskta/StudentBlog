## 👋  Bem-vindo(a)

Projeto desenvolvido para resolver o Tech Challenge - Fase 2 - FIAP.
Sobre o desafio: "Desenvolver uma API para uma aplicação de blogging dinâmico."

### 📘 Requisitos Funcionais

● GET /posts - Lista de Posts: 
    ▪ Este endpoint permitirá que os(as) estudantes visualizem uma lista de todos os posts disponíveis na página principal. 
● GET /posts/:id - Leitura de Posts: 
    ▪ Ao acessar este endpoint com um ID específico de post, os(as) alunos(as) poderão ler o conteúdo completo desse post. 
● POST /posts - Criação de postagens: 
    ▪ Permite que docentes criem novas postagens. Este endpoint aceitará dados como título, conteúdo e autor no corpo da requisição. 
● PUT /posts/:id - Edição de postagens: 
    ▪ Utilizado para editar uma postagem existente. Professores(as) deverão fornecer o ID do post que desejam editar e os novos dados no corpo da requisição. 
● GET /posts - Listagem de Todas as Postagens: 
    ▪ Este endpoint permitirá que docentes vejam todas as postagens criadas, facilitando a gestão do conteúdo. 
● DELETE /posts/:id - Exclusão de Postagens: 
    ▪ Permite que professores(as) excluam uma postagem específica, usando o ID do post como parâmetro. 
● GET /posts/search - Busca de Posts: 
    ▪ Este endpoint permitirá a busca de posts por palavras chave. Os usuários poderão passar uma query string com o termo de busca e o sistema retornará uma lista de posts que contêm esse termo no título ou conteúdo. 

### 💻 Tecnologias Utilizadas

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NodeJS](https://img.shields.io/badge/node.js-339933?logo=Node.js&logoColor=white)](https://nodejs.org/docs/latest/api/)
![Static Badge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Static Badge](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=whit)


- Typescript, Node js, Express e TypeORM para a contrução da API.
- PostgreSQL para o banco de dados.

### ☑  Como executar a aplicação

*Atenção, Este projeto é executado dentro do Docker, certifique-se de ter instalado em sua máquina!*

1. Clone este repositório.
2. No terminal execute o comando `docker compose up` para subir as imagens necessárias.
3. **Opcional,** caso queira inserir dados dummy no banco para testar execute o comando `npm run seed`.
4. Execute o comando `npm install` para instalar as dependencias necessárias.
5. **Opcional,** caso queira executar em modo de desenvolvedor execute o comando `npm run dev`.
6. Execute o comando `npm run start` para iniciar a aplicação em produção.

### ☑  Como utilizar

- Para executar a aplicação você pode utilizar algum software externo como Postman, Insominia, etc.
- Outra opção é utilizar o Vs code, instalar a extensão **REST Client** e executar os comandos localizados no arquivo `test.rest`.