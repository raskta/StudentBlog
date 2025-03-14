"use client"

import { RequestStatus, selectFilteredPosts, usePostStore } from "@/stores/post-store"
import { useEffect, useMemo } from "react"
import PostCard from "../PostCard/PostCard"
import SearchFilter from "../SearchFilter/SearchFilter"

export default function Posts() {
  const fetchPosts = usePostStore((state) => state.fetchPosts)
  const posts = usePostStore((state) => state.posts)
  const searchTerm = usePostStore((state) => state.searchTerm)

  const filteredPosts = useMemo(
    () =>
      selectFilteredPosts({
        posts,
        searchTerm,
        status: RequestStatus.IDLE,
        error: null,
      }),
    [posts, searchTerm],
  )

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <section
      className="mx-auto w-full pt-10"
      id="posts"
    >
      <SearchFilter />

      {filteredPosts.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Nenhum post encontrado...</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              data-post-id={post.id}
              className="flex justify-center"
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
      )}
    </section>
  )
}
