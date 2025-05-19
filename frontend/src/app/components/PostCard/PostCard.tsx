import { Post } from "../../../../../shared/interfaces/post"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import Image from "next/image"
import Link from "next/link"

export default function PostCard({
  titulo,
  subtitulo,
  usuario,
  dtcriacao,
  urlimagem,
  tituloslug,
}: Partial<Post>) {
  const data = dayjs(dtcriacao).locale("pt-br")
  const dataFormatada = data.format("DD [de] MMMM [de] YYYY")

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  const imageUrl = urlimagem?.startsWith("/uploads") ? `${baseUrl}${urlimagem}` : urlimagem

  return (
    <div className="block h-fit min-h-96 w-xs rounded-3xl md:w-full">
      <Link
        href={`/post/${tituloslug}`}
        className="group/card relative"
        title={`Ver postagem: ${titulo}`}
      >
        <Image
          src={
            imageUrl ||
            "https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1280/p:16x9/news_en_1920x1080.jpg"
          }
          width={392}
          height={207}
          className="h-64 w-full rounded-3xl object-cover"
          alt={`Imagem que representa a postagem ${titulo}`}
          unoptimized
        />
        <div className="group-hover/card:bg-main-dark-blue/75 absolute bottom-0 h-18 w-full content-center rounded-b-3xl bg-black/25 p-4 text-lg font-medium text-zinc-100 transition-colors">
          <h2 className="line-clamp-2">{titulo}</h2>
        </div>
      </Link>
      <div className="text-raisin-black space-y-3 px-2 pt-2 text-sm">
        <div className="flex items-center justify-center gap-2 text-xs font-medium">
          <p>{usuario?.nome}</p>
          <span className="select-none">|</span>
          <time dateTime={dtcriacao?.toString()}>{dataFormatada}</time>
        </div>
        <p className="line-clamp-2 text-sm">{subtitulo}</p>
        <div className="flex items-center gap-1"></div>
      </div>
    </div>
  )
}
