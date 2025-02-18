"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import { usePostStore } from "@/stores/post-store"
import Link from "next/link"
import { HomeIcon } from "lucide-react"
import { CustomForm } from "@/app/components/CustomForm/CustomForm"
import { FormField } from "@/app/components/CustomForm/components/FormField/FormField"

export type Inputs = {
  titulo: string
  subtitulo: string
  conteudo: string
  imagem: FileList
  idusuario: number
}

export default function CriarPostPage() {
  const form = useForm<Inputs>()
  const createPost = usePostStore((state) => state.createPost)
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStatus("pending")

    try {
      await createPost({ ...data, idusuario: 1 })
      setStatus("success")
      toast.success(`"${data.titulo}" foi criado com sucesso!`)
    } catch (error) {
      setStatus("error")
      toast.error(error instanceof Error ? error.message : "Erro desconhecido")
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-4">
      <CustomForm
        form={form}
        onSubmit={onSubmit}
      >
        <h1 className="text-main-dark-blue mb-6 text-2xl font-semibold">Criar novo post</h1>

        <FormField
          id="titulo"
          label="Título"
          validation={{ required: "Título é obrigatório" }}
          placeholder="Insira o título"
        />

        <FormField
          id="subtitulo"
          label="Subtítulo"
          isTextArea
          rows={2}
          validation={{ required: "Subtítulo é obrigatório" }}
          placeholder="Insira o subtítulo"
        />

        <FormField
          id="conteudo"
          label="Conteúdo"
          isTextArea
          rows={8}
          validation={{
            required: "Conteúdo é obrigatório",
            minLength: { value: 100, message: "Mínimo de 100 caracteres" },
          }}
          placeholder="Insira o conteúdo completo"
        />

        <FormField
          id="imagem"
          label="Imagem"
          type="file"
          accept="image/*"
          className="mb-6"
        />

        {status === "success" ? (
          <Link
            className="flex items-center justify-center gap-2 rounded-lg bg-green-100 p-3 transition-colors hover:bg-green-200"
            href="/"
          >
            Post criado, voltar para Home
            <HomeIcon
              size={20}
              className="text-gray-800"
            />
          </Link>
        ) : (
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-100 p-3 font-medium transition-colors hover:bg-blue-200"
            disabled={status === "pending"}
          >
            {status === "pending" ? "Enviando..." : "Criar Post"}
          </button>
        )}
      </CustomForm>
    </main>
  )
}
