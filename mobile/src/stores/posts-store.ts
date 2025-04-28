import { create } from "zustand";
import { Post } from "../../../shared/interfaces/post";
import { postsMock } from "@/src/mocks/posts"; // importa o mock

interface PostsState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  posts: Post[];
  filteredPosts: Post[];
  loading: boolean;
  error: string | null;
  setPosts: (posts: Post[]) => void;
  fetchPosts: () => Promise<void>;
  getPostById: (id: number) => Post | undefined;
}

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

  fetchPosts: async () => {
    console.log("Fetching posts...");
    set({ loading: true, error: null });

    setTimeout(() => {
      set({ posts: postsMock, filteredPosts: postsMock, loading: false });
    }, 1000);
  },
  getPostById: (id: number) => {
    const { posts } = get();
    return posts.find((post) => post.id === id);
  },
}));
