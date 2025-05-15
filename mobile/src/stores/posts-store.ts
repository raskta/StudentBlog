import { create } from "zustand";
import { Post } from "../../../shared/interfaces/post";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

enum RequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

type PostsState = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  posts: Post[];
  filteredPosts: Post[];
  loading: boolean;
  error: string | null;
  setPosts: (posts: Post[]) => void;
  getPostById: (id: number) => Post | undefined;
  fetchPosts: () => Promise<void>;
  createPost: (data: CreatePostRequestFields) => Promise<Post>;
  updatePost: (id: number, data: Partial<Post>) => Promise<Post>;
  deletePost: (id: number) => Promise<void>;
};

export type CreatePostRequestFields = {
  titulo: string;
  subtitulo: string;
  conteudo: string;
  imagem: FileList | string;
  idusuario: string;
};

export const usePostsStore = create<PostsState>((set, get) => ({
  searchTerm: "",
  posts: [],
  filteredPosts: [],
  loading: false,
  error: null,
  setPosts: (posts) => set({ posts, filteredPosts: posts }),
  setSearchTerm: (term: string) => {
    const { posts } = get();
    const filtered = term
      ? posts.filter((post) =>
          [post.titulo, post.subtitulo, post.usuario.nome]
            .filter(Boolean)
            .some((field) => field?.toLowerCase().includes(term.toLowerCase()))
        )
      : posts;
    set({ searchTerm: term, filteredPosts: filtered });
  },

  getPostById: (id: number) => {
    const posts = get().posts;
    return posts.find((post) => post.id === id);
  },

  fetchPosts: async () => {
    console.log("Fetching posts...");
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      set({
        posts: data,
        filteredPosts: data,
        loading: false,
      });
    } catch (error: any) {
      console.error("Erro ao buscar posts:", error.message);

      set({
        error: error.message || "Erro desconhecido",
        loading: false,
      });
    }
  },

  createPost: async (data: CreatePostRequestFields): Promise<Post> => {
    const { posts } = get();
    posts.forEach((post) => {
      if (post.titulo === data.titulo || post.conteudo === data.conteudo) {
        throw new Error("Post com esse título e/ou conteúdo já existe");
      }
    });

    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao criar o post");
    }

    const createdPost = await response.json();

    set((state) => ({
      posts: [...state.posts, createdPost],
      filteredPosts: [...state.posts, createdPost],
    }));

    return createdPost;
  },

  updatePost: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Erro ao editar post: ${id} - ${data.titulo}`);
      }

      const updatedPost: Post = await response.json();

      set((state) => ({
        posts: state.posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)),
        filteredPosts: state.posts.map((post) =>
          post.id === id ? { ...post, ...updatedPost } : post
        ),
      }));

      return updatedPost;
    } catch (error) {
      console.error("Erro no updatePost:", error);
      throw error;
    }
  },

  deletePost: async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao excluir post");
      }

      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
        filteredPosts: state.posts.filter((post) => post.id !== id),
      }));
    } catch (error) {}
  },
}));
