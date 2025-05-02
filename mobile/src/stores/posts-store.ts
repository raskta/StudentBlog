import { create } from "zustand";
import { Post } from "../../../shared/interfaces/post";
import { postsMock } from "@/src/mocks/posts"; // importa o mock

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
  updatePost: (id: number, data: Post) => Promise<Post>;
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

    set({ posts: postsMock, filteredPosts: postsMock, loading: false });
  },

  updatePost: async (id: number, data: Post) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || `Erro ao editar post: ${id} - ${data.titulo}`
      );
    }

    const updatedPost: Post = await response.json();

    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? updatedPost : post)),
    }));

    return updatedPost;
  },
}));
