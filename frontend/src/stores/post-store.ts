// post-store.ts
import { Post } from "@/interfaces/post"
import { create } from "zustand"
import kebabCase from "lodash.kebabcase"

interface PostStore {
  posts: Post[]
  fetchPosts: () => Promise<void>
}

const initialState = {
  posts: [],
}

export const usePostStore = create<PostStore>((set) => ({
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
        dtalteracao: new Date(post.dtcriacao), // Ajustar conforme seu back-end
        tituloslug: kebabCase(post.titulo),
      }))

      set({ posts: parsedPosts })
    } catch (error) {
      console.error("Erro ao buscar posts:", error)
    }
  },
}))
