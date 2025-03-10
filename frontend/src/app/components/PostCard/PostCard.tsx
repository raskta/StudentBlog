import { Post } from "@/interfaces/post"
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

  return (
    <div className="block h-fit min-h-96 w-xs rounded-3xl md:w-full">
      <Link
        href={`/post/${tituloslug}`}
        className="group/card relative"
        title={`Ver postagem: ${titulo}`}
      >
        {urlimagem ? (
          <Image
            src={urlimagem}
            width={392}
            height={207}
            className="h-64 w-full rounded-3xl object-cover"
            alt={`Imagem que representa a postagem ${titulo}`}
          />
        ) : (
          <div className="block h-64 w-full rounded-3xl bg-orange-200" />
        )}
        <div className="group-hover/card:bg-main-dark-blue/75 absolute bottom-0 h-18 w-full content-center rounded-b-3xl bg-black/25 p-4 text-lg font-medium text-zinc-100 transition-colors">
          <h2>{titulo}</h2>
        </div>
      </Link>
      <div className="text-raisin-black space-y-3 px-2 pt-2 text-sm">
        <div className="flex justify-end gap-2 font-medium">
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
