import { create } from "zustand"
import { persist } from "zustand/middleware"
import kebabCase from "lodash.kebabcase"
import { Inputs } from "@/app/posts/criar/page"
import { Post } from "@/@interfaces/post"

export enum RequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

interface PostStoreState {
  posts: Post[]
  searchTerm: string
  status: RequestStatus
  error: string | null
}

interface PostStoreActions {
  fetchPosts: () => Promise<void>
  createPost: (formData: Inputs) => Promise<void>
  deletePost: (id: number) => Promise<void>
  updatePost: (id: number, data: Post) => Promise<Post>
  getPostBySlug: (slug: string) => Post | undefined
  getPostById: (id: number) => Post | undefined
  setSearchTerm: (term: string) => void
  resetStatus: () => void
}

const initialState: PostStoreState = {
  posts: [],
  searchTerm: "",
  status: RequestStatus.IDLE,
  error: null,
}

const apiService = {
  fetchPosts: async (): Promise<Post[]> => {
    const response = await fetch("http://localhost:3000/posts")
    if (!response.ok) throw new Error("Failed to fetch posts")
    return response.json()
  },

  createPost: async (postData: Inputs): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create post")
      }
    } catch (error) {
      console.error(error)
    }
  },
}

// Função de validação/transformação de posts
const parsePosts = (posts: Post[]): Post[] => {
  return posts
    .map((post) => ({
      ...post,
      dtcriacao: new Date(post.dtcriacao),
      dtalteracao: new Date(post.dtalteracao),
      tituloslug: kebabCase(post.titulo),
    }))
    .sort((a, b) => b.dtcriacao.getTime() - a.dtcriacao.getTime())
}

export const usePostStore = create<PostStoreState & PostStoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Actions
      fetchPosts: async () => {
        try {
          set({ status: RequestStatus.PENDING })
          const data = await apiService.fetchPosts()
          const parsedPosts = parsePosts(data)
          set({ posts: parsedPosts, status: RequestStatus.SUCCESS })
        } catch (error) {
          set({
            status: RequestStatus.ERROR,
            error: error instanceof Error ? error.message : "Unknown error",
          })
        }
      },

      createPost: async (postData: Inputs): Promise<void> => {
        const posts = get().posts
        posts.forEach((post) => {
          if (post.titulo === postData.titulo || post.conteudo === postData.conteudo) {
            throw new Error("Post com esse título ou conteúdo já existe")
          }
        })

        const response = await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || "Erro ao criar o post")
        }

        // Captura o post criado retornado pelo backend
        const createdPost = await response.json()

        set((state) => ({
          posts: [...state.posts, createdPost],
        }))
      },

      deletePost: async (id: number): Promise<void> => {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || "Erro ao excluir post")
        }

        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }))
      },

      updatePost: async (id: number, data: Post) => {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || `Erro ao editar post: ${id} - ${data.titulo}`)
        }

        const updatedPost: Post = await response.json()

        set((state) => ({
          posts: state.posts.map((post) => (post.id === id ? updatedPost : post)),
        }))

        return updatedPost
      },

      getPostBySlug: (slug: string) => {
        return get().posts.find((post) => post.tituloslug === slug)
      },

      getPostById: (id: number) => {
        return get().posts.find((post) => post.id === id)
      },
      setSearchTerm: (term: string) => {
        set({ searchTerm: term.toLowerCase() })
      },

      resetStatus: () => {
        set({ status: RequestStatus.IDLE, error: null })
      },
    }),
    {
      name: "post-storage",
      partialize: (state) => ({
        posts: state.posts,
        searchTerm: state.searchTerm,
      }),
    },
  ),
)

// Selector derivado para posts filtrados
export const selectFilteredPosts = (state: PostStoreState): Post[] => {
  const { posts, searchTerm } = state
  if (!searchTerm.trim()) return posts

  return posts.filter((post) => {
    const search = searchTerm.toLowerCase()
    return (
      post.titulo?.toLowerCase().includes(search) || post.subtitulo?.toLowerCase().includes(search)
    )
  })
}
