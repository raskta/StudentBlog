import { Post } from "@/interfaces/post"
import dayjs from "dayjs"
import "dayjs/locale/pt-br" // Importa o idioma corretamente
import { UserRound } from "lucide-react"
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
    <div className="block w-xs rounded-3xl md:w-sm">
      <Link
        href={tituloslug ?? ""}
        className="group/card relative"
        title={`Ver postagem: ${titulo}`}
      >
        {urlimagem ? (
          <Image
            src={urlimagem}
            width={392}
            height={207}
            objectFit="cover"
            className="w-full rounded-3xl"
            alt={`Imagem que representa a postagem ${titulo}`}
          />
        ) : (
          <div className="block h-64 w-full rounded-3xl bg-orange-200" />
        )}
        <div className="group-hover/card:bg-main-dark-blue/75 absolute bottom-0 h-18 w-full content-center rounded-b-3xl bg-black/25 p-4 text-lg font-medium text-zinc-100 transition-colors">
          <h2>{titulo}</h2>
        </div>
      </Link>
      <div className="space-y-2 px-2 pt-2 text-sm">
        <time
          className="flex justify-end font-medium"
          dateTime={dtcriacao?.toString()}
        >
          {dataFormatada}
        </time>
        <p className="line-clamp-2">{subtitulo}</p>
        <div className="flex items-center gap-1">
          <UserRound
            strokeWidth={1.5}
            size={32}
            color="#212421"
          />
          <p>{usuario?.nome}</p>
        </div>
      </div>
    </div>
  )
}
