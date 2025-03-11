# Blog Application Front-End

Aplicação front-end construída utilizando:

![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black)
![React](https://img.shields.io/badge/React-18.2-%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-%233178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-%2338B2AC)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.54.2-%234f46e5)
![Zustand](https://img.shields.io/badge/Zustand-5.0.3-%23d1d5db)

## Tech Stack Principal

| Categoria            | Tecnologias                                                                  |
|----------------------|-----------------------------------------------------------------------------|
| **Framework**        | Next.js 15 (App Router)                                                     |
| **Linguagem**        | TypeScript                                                                  |
| **Estado Global**    | Zustand                                                                     |
| **Estilização**      | Tailwind CSS 4.0 + PostCSS                                                  |
| **Formulários**      | react-hook-form + Yup                                                       |
| **Icones**           | Lucide React                                                                |
| **Notificações**     | Sonner              

## 🚀 Setup Initial

### Pré-requisitos
- Node.js v18+
- npm (v9+)
- Git
- Docker & Docker Compose

### Instalação
1. Clone o repositório:
   ```bash
    git clone https://github.com/EduSphereGroup/StudentBlog
   ```
2. Suba a aplicação realizando build com o Docker Compose
    ```bash
     docker compose up --build
    ```
3. Faça a população da base de dados da aplicação com dados básicos

    Com a aplicação rodando no docker, abra um novo terminal e execute os seguintes comandos:

   ```bash
    cd backend
    npm run seed
   ```

4. Em seguida, pare a aplicação no Docker e suba ela novamente para que os dados sejam lidos corretamente
   ```bash
   docker compose down

   docker compose up
   ```

## Guia de uso

### Página inicial
Na página inicial, é apresentado todos os posts cadastrados, onde qualquer usuário pode acessar, seja autenticado ou não, podendo também acessar a página de detalhamento do post ao clicar sobre o card da postagem.

### Página Detalhamento de Post
Na página de detalhamento, é possível visualizar a data da postagem, autor da postagem, imagem caso tenha, título, subtítulo e o conteúdo da publicação

### Página de Gerenciamento de conteúdo
Na aba de navegação, é possível navegar para a página de "Gerenciamento", onde são gerenciadas todas as postagens, para acessar essa página é necessário estar autenticado, caso não esteja, será direcionado para a página de <u>[Login](#página-de-login)</u>

Nessa página de gerenciamento, é apresentado um botão para criar novas postagens, assim como uma tabela contendo todas as publicações, com botões ao lado de cada linha, com a opção de editar o post específico ou excluí-lo.

- Para editar o post, você será redirecionado para a página de edição do post
- Para excluir o post, você clicará no ícone de lixeira, aparecerá uma notificação para confirmar a sua escolha, podendo ser cancelada ou confirmada 

### Página de Login
Formulário para realizar login, onde o campo de usuário é o <b>Email do usuário</b> e a senha é o <b>id do usuário</b> que seria informado pela equipe de sistema

Caso você tenha realizado o procedimento de população da aplicação, usando o npm run seed do backend, acesso utilizando: 

- email: email1@gmail.com 
- senha: 1
