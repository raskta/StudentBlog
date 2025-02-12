import { Post } from "@/interfaces/post"
import Image from "next/image"
import Link from "next/link"

export default function PostCard({
  titulo,
  subtitulo,
  idusuario,
  urlimagem,
  tituloslug,
}: Partial<Post>) {
  return (
    <Link
      href={tituloslug ?? ""}
      className="rounded-3xl"
    >
      <div className="relative">
        {urlimagem && (
          <Image
            src={urlimagem}
            width={392}
            height={207}
            objectFit="cover"
            className="w-full rounded-3xl"
            alt={`Imagem que representa a postagem ${titulo}`}
          />
        )}
        <div className="absolute bottom-0 h-18 w-full content-center rounded-b-3xl bg-black/25 p-4 text-lg font-medium text-zinc-100">
          <h2>{titulo}</h2>
        </div>
      </div>
    </Link>
  )
}
