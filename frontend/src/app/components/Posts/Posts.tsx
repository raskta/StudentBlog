"use client"

import { usePostStore } from "@/stores/post-store"
import { useEffect } from "react"
import PostCard from "../PostCard/PostCard"
import SearchFilter from "../SearchFilter/SearchFilter"

export default function Posts() {
  const posts = usePostStore((state) => state.filteredPosts)
  const fetchPosts = usePostStore((state) => state.fetchPosts)

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <section
      className="pt-10"
      id="posts"
    >
      <SearchFilter />

      {posts.length === 0 ? (
        <p className="text-xl">Nenhum post encontrado...</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 flex-wrap gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="mx-auto"
              >
                <PostCard
                  titulo={post.titulo}
                  subtitulo={post.subtitulo}
                  usuario={post.usuario}
                  urlimagem={post.urlimagem}
                  tituloslug={post.tituloslug}
                  dtcriacao={post.dtcriacao}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
