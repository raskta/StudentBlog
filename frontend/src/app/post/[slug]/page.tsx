"use client"

import { Post } from "@/../../shared/interfaces/post"
import { usePostStore } from "@/stores/post-store"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import Image from "next/image"
import notFound from "@/app/not-found"
import Link from "next/link"

export default function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params) // Correção: recebe params diretamente
  const router = useRouter()
  dayjs.locale("pt-br")
  const { getPostBySlug, fetchPosts } = usePostStore()
  const [post, setPost] = useState<Post | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await fetchPosts()
      const postFound = await getPostBySlug(slug)

      if (!postFound) {
        setLoading(false)
      }

      setPost(postFound)
      setLoading(false)
    }

    loadData()
  }, [slug, fetchPosts, getPostBySlug, router])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!post) {
    return notFound()
  }

  const data = dayjs(post?.dtcriacao)
  const dataFormatada = data.format("DD [de] MMMM [de] YYYY")

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  const imageUrl = post.urlimagem?.startsWith("/uploads")
    ? `${baseUrl}${post.urlimagem}`
    : post.urlimagem

  return (
    <main>
      <div className="flex justify-end p-4">
        <Link
          href="/"
          className="text-main-dark-blue font-normal hover:underline"
        >
          ← Voltar
        </Link>
      </div>
      <article>
        <section className="mx-auto max-w-xs space-y-6 text-center md:max-w-2xl">
          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <time
              className="rounded-full bg-blue-100 px-4 py-2 font-light"
              dateTime={post?.dtcriacao?.toString()}
            >
              {dataFormatada}
            </time>
            <p>{post?.usuario?.nome}</p>
          </div>
          <div className="space-y-3">
            <h1 className="text-main-dark-blue text-3xl font-semibold tracking-wide">
              {post?.titulo}
            </h1>
            <p className="font-normal">{post?.subtitulo}</p>
          </div>
        </section>
        {}
        <div className="flex justify-center pt-4">
          <Image
            src={
              imageUrl ||
              "https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1280/p:16x9/news_en_1920x1080.jpg"
            }
            width={512}
            height={306}
            className="h-auto max-h-96 w-auto max-w-full rounded-lg object-cover"
            alt={`Imagem que representa postagem ${post.titulo}`}
            unoptimized // 🔥 Importante para evitar restrições do Next.js com imagens externas
          />
        </div>
        <section className="mx-auto max-w-xs pt-4 md:max-w-2xl lg:max-w-4xl lg:pt-12 2xl:max-w-5xl">
          <p className="leading-7 font-light">{post.conteudo}</p>
        </section>
      </article>
    </main>
  )
}
