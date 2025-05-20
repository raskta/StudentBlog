import Link from "next/link"

export default function notFound() {
  return (
    <main
      id="not_found"
      className="mx-auto w-fit"
    >
      <h1 className="text-main-dark-blue pb-3 text-4xl font-semibold tracking-wide">
        Página não encontrada...
      </h1>
      <h2 className="text-raisin-black text-lg">
        Tente novamente ou vá para nossa{" "}
        <Link
          className="text-blue-600 underline underline-offset-8"
          href={"/"}
        >
          página inicial
        </Link>{" "}
        <span className="ml-1.5">;)</span>
      </h2>
    </main>
  )
}
