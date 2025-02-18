import Link from "next/link"
import PostsTable from "../components/PostsTable/PostsTable"

export default function GerenciamentoPage() {
  return (
    <main>
      <h1 className="text-main-dark-blue text-3xl font-semibold tracking-wide">
        Gerenciamento de postagens
      </h1>
      <section
        id="gerenciamento_actions"
        className="flex flex-row gap-4 py-6"
      >
        <Link
          href="/posts/criar"
          title="Ir para a página de criação de Post"
          className="rounded-full bg-blue-200 px-4 py-2 transition-colors hover:bg-blue-300/80 active:bg-blue-300"
        >
          Novo Post
        </Link>
      </section>
      <section
        id="gerenciamento_posts"
        className="pt-8"
      >
        <h2 className="text-main-dark-blue text-xl font-semibold">Lista de posts</h2>
        <PostsTable />
      </section>
    </main>
  )
}
