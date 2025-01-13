## 👋  Bem-vindo(a)

Projeto desenvolvido para resolver o Tech Challenge - Fase 2 - FIAP.

Sobre o desafio: "_Desenvolver uma API para uma aplicação de blogging dinâmico._"

**Integrantes**

- Gabriel Nascimento - RM359635
- Rodrigo Souza - RM359534
- Stella Yano - RM359726
- Vinicius Wrubleski - RM359675
- Vitor Bassani - RM358848

##

### 💻 Tecnologias Utilizadas

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/docs/latest/api/)
![Static Badge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Static Badge](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=whit)
![Static Badge](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Static Badge](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
![Static Badge](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)


- Typescript, Node js, Express e TypeORM para a construção da API.
- PostgreSQL para o banco de dados.
- Docker para containerização.
- Swagger para documentação.
- Jest para os testes unitários.

##

### ✔ Arquiterura

A Api foi desenvolvida na arquitetura REST com princípios de modularização e separação de responsabilidades.

Organização do projeto:

```
src/
├── config/                  # Configurações da aplicação (banco de dados, variáveis de ambiente, etc.)
│   ├── swagger.config.ts    # Configuração do Swagger
├── middleware/              # Middlewares personalizados (autenticação, validação, etc.)
├── modules/                 # Módulos da aplicação, separados por funcionalidade
│   ├── posts/               # Módulo de Posts
│   │   ├── controller/      # Lógica de entrada (handlers das rotas)
│   │   ├── dto/             # Data Transfer Objects (validação e transformação de dados)
│   │   ├── models/          # Definição de schemas ou classes de entidades
│   │   ├── repository/      # Operações de banco de dados
│   │   ├── router/          # Definição de rotas específicas
│   │   └── service/         # Lógica de negócios
│   │       └── tests        # Testes
│   └── users/               # Módulo de Usuários (estrutura similar ao módulo de Posts)
│       ├── controller/
│       ├── dto/
│       ├── models/
│       ├── repository/
│       ├── router/
│       └── service/
├── shared/                  # Componentes reutilizáveis e utilitários
│   ├── utils/               # Funções de apoio
│   ├── error/               # Tratamento de erros personalizados
│   ├── seeds/               # Dados iniciais
│   └── routes/              # Centralização da chamada das rotas
├── app.ts                   # Ponto de entrada da aplicação

```

##

### 📘 Requisitos Funcionais

- **GET /posts** - Lista de Posts: <br>
    ▪ Este endpoint permitirá que os(as) estudantes visualizem uma lista de todos os posts disponíveis na página principal.

- **GET /posts/:id** - Leitura de Posts: <br>
    ▪ Ao acessar este endpoint com um ID específico de post, os(as) alunos(as) poderão ler o conteúdo completo desse post. 

- **POST /posts** - Criação de postagens: <br>
    ▪ Permite que docentes criem novas postagens. Este endpoint aceitará dados como título, conteúdo e autor no corpo da requisição. 

- **PUT /posts/:id** - Edição de postagens: <br>
    ▪ Utilizado para editar uma postagem existente. Professores(as) deverão fornecer o ID do post que desejam editar e os novos dados no corpo da requisição. 

- **GET /posts** - Listagem de Todas as Postagens: <br> 
    ▪ Este endpoint permitirá que docentes vejam todas as postagens criadas, facilitando a gestão do conteúdo. 

- **DELETE /posts/:id** - Exclusão de Postagens: <br>
    ▪ Permite que professores(as) excluam uma postagem específica, usando o ID do post como parâmetro. 
    
- **GET /posts/search** - Busca de Posts: <br>
    ▪ Este endpoint permitirá a busca de posts por palavras chave. Os usuários poderão passar uma query string com o termo de busca e o sistema retornará uma lista de posts que contêm esse termo no título ou conteúdo. 

##

### 🚀 Como executar a aplicação
> _**Atenção**, Este projeto é executado dentro do Docker, certifique-se de ter instalado em sua máquina!_

1. Clone este repositório.
2. No terminal execute o comando, para subir as imagens necessárias:
```
docker compose up
```
3. A aplicação estará disponível no enderepo `localhost:3000` verifique a documentação das rotas disponíveis no link `localhost:3000/api-docs`.

##

###  ☑ Como editar a aplicação

1. Clone este repositório.
2. Execute o comando para instalar as dependencias:
```
npm install
```
3. Para executar a aplicação em modo de desenvolvedor execute o comando:
```
npm run dev
```

**Opcional** 
- caso queira inserir dados dummy no banco para testar execute o comando:
```
npm run seed
```
- Para testar a aplicação você pode utilizar algum software externo como Postman, Insominia, etc.
- Outra opção é utilizar o Vs code, instalar a extensão **REST Client** e executar os comandos localizados no arquivo `test.rest`.

##

###   Scripts
**build:** Compila o código TypeScript para JavaScript e gera os arquivos na pasta dist.
```
npm run build
```
**dev:** Inicia a aplicação em modo de desenvolvimento, recompilando automaticamente sempre que houver alterações no código. Usa ts-node-dev e carrega as variáveis do .env.
```
npm run dev
```
**seed:** Executa os scripts de seed para popular o banco de dados com dados iniciais.
```
npm run seed
```
**test:** Executa os testes usando jest e gera um relatório de cobertura de testes.
```
npm run test
```
**start:** Compila o código e inicia a aplicação em modo de produção.
```
npm run start
```
**docker-build:** Reconstrói as imagens Docker sem usar o cache. Ideal para quando há alterações no Dockerfile ou nas dependências (package.json).
```
npm run docker-build
```
**docker:** Sobe os containers Docker e, em seguida, limpa as imagens dangling (não utilizadas) para liberar espaço.
```
npm run docker
```
**docker-rebuild:** Combina os scripts docker-build e docker. Primeiro, reconstrói as imagens sem cache, depois sobe os containers e limpa as imagens dangling.
```
npm run docker-rebuild
```
.