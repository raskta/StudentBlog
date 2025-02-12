"use client"

import { usePostStore } from "@/stores/post-store"
import { useEffect } from "react"
import PostCard from "../PostCard/PostCard"

export default function Posts() {
  const posts = usePostStore((state) => state.posts)
  const fetchPosts = usePostStore((state) => state.fetchPosts)

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <section
      className="pt-10"
      id="posts"
    >
      {posts.length === 0 ? (
        <p className="text-xl">Nenhum post encontrado...</p>
      ) : (
        <ul className="grid grid-cols-2 flex-wrap gap-4 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard
                titulo={post.titulo}
                subtitulo={post.subtitulo}
                idusuario={post.idusuario}
                urlimagem={post.urlimagem}
                tituloslug={post.tituloslug}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
