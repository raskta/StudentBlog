# Blog Application Mobile
👋 Bem-vindo(a)

## Integrantes

- Gabriel Nascimento - RM359635
- Rodrigo Souza - RM359534
- Stella Yano - RM359726
- Vinicius Wrubleski - RM359675
- Vitor Bassani - RM358848

## 🧑‍💻 Tech Stack Principal

[![Expo](https://img.shields.io/badge/Expo-53.0.9-black?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.79.2-%2361DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-%233178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.3-%23d1d5db?style=for-the-badge&logo=zustand&logoColor=black)](https://zustand-demo.pmnd.rs/)

## 🚀 Começando

### Pré-requisitos
- Node.js v20+
- npm v9+
- Expo CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS, apenas macOS)

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/EduSphereGroup/StudentBlog
```

2. Navegue até o diretório backend
```bash
cd backend
```

3. Instale as dependências
```bash
npm install
```

4. Suba o Backend realizando build com o Docker Compose
    ```bash
     docker compose up --build
    ```

5. Navegue até o diretório mobile
```bash
cd mobile
```

6. Instale as dependências
```bash
npm install
```

7. Inicie o servidor de desenvolvimento
```bash
npm run start
```

## 📁 Estrutura do Projeto

```
mobile/
├── app/                    # Arquivos do roteador (Expo Router)
│   ├── (tabs)/            # Telas de navegação por abas
│   ├── post/              # Telas relacionadas a posts
│   ├── user/              # Telas relacionadas a usuários
│   └── login/             # Telas de autenticação
├── src/
│   ├── assets/            # Recursos estáticos (imagens, fontes)
│   ├── components/        # Componentes React reutilizáveis
│   ├── hooks/             # Hooks React personalizados
│   ├── stores/            # Gerenciamento de estado com Zustand
│   ├── theme/             # Configuração de tema
│   ├── utils/             # Funções utilitárias
│   └── mocks/             # Dados simulados para desenvolvimento
└── shared/                # Interfaces compartilhadas com outros pacotes
```

## 🔑 Funcionalidades Principais

- **Autenticação**: Sistema seguro de login com gerenciamento de tokens
- **Gerenciamento de Posts**: Criar, ler, atualizar e excluir posts do blog
- **Gerenciamento de Usuários**: Gerenciamento de perfis e funções de usuários
- **Suporte Offline**: Persistência de dados e funcionalidades offline
- **Manipulação de Imagens**: Upload e gerenciamento de imagens dos posts
- **Busca e Filtros**: Busca avançada e filtragem de posts

## 📦 Principais Dependências

- `expo`: Framework e plataforma para aplicações React universais
- `expo-router`: Sistema de roteamento baseado em arquivos
- `zustand`: Solução de gerenciamento de estado
- `react-native-safe-area-context`: Tratamento de área segura
- `@expo/vector-icons`: Biblioteca de ícones
- `react-native-toast-message`: Notificações toast
- `expo-secure-store`: Armazenamento seguro para dados sensíveis

## 📱 Plataformas Suportadas

- iOS 13.0+
- Android API Level 21+
- Navegadores web (experimental)