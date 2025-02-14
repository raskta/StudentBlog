// post-store.ts
import { Post } from "@/interfaces/post"
import { create } from "zustand"
import kebabCase from "lodash.kebabcase"

interface PostStore {
  posts: Post[]
  filteredPosts: Post[]
  searchTerm: string
  fetchPosts: () => Promise<void>
  findPostBySluggedTitle: (slug: string) => Promise<Post | undefined>
  setSearchTerm: (term: string) => void
}

const initialState = {
  posts: [] as Post[],
  filteredPosts: [] as Post[],
  searchTerm: "",
}

export const usePostStore = create<PostStore>((set, get) => ({
  ...initialState,

  fetchPosts: async () => {
    try {
      const response = await fetch("http://localhost:3000/posts", {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) throw new Error("Erro na requisição")

      const data = await response.json()

      const parsedPosts = data.map((post: Post) => ({
        ...post,
        dtcriacao: new Date(post.dtcriacao),
        dtalteracao: new Date(post.dtcriacao),
        tituloslug: kebabCase(post.titulo),
      }))

      set({ posts: parsedPosts, filteredPosts: parsedPosts })
    } catch (error) {
      console.error("Erro ao buscar posts:", error)
    }
  },

  findPostBySluggedTitle: async (slug: string): Promise<Post | undefined> => {
    try {
      const { posts } = get()
      return posts.find((post) => post.tituloslug === slug)
    } catch (error) {
      console.error("Erro ao encontrar post:", error)
      return undefined
    }
  },

  setSearchTerm: (term: string) => {
    const { posts } = get()

    const filteredPosts =
      term.trim() === ""
        ? posts
        : posts.filter((post) => {
            const lowerTerm = term.toLowerCase()
            const titleMatch = post.titulo?.toLowerCase().includes(lowerTerm)
            const subtitleMatch = post.subtitulo?.toLowerCase().includes(lowerTerm)
            return titleMatch || subtitleMatch
          })

    set({ searchTerm: term, filteredPosts })
  },
}))
