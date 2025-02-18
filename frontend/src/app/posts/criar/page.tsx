"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../../components/Input/Input"
import InputLabel from "../../components/InputLabel/InputLabel"
import FormFieldset from "../../components/FormFieldset/FormFieldset"
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput"
import { toast } from "sonner"
import { useState } from "react"
import { usePostStore } from "@/stores/post-store"
import Link from "next/link"
import { HomeIcon } from "lucide-react"

export type Inputs = {
  titulo: string
  subtitulo: string
  conteudo: string
  imagem: FileList
  idusuario: number
}

export default function CriarPostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const createPost = usePostStore((state) => state.createPost)

  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStatus("pending")

    toast.promise(createPost({ ...data, idusuario: 1 }), {
      loading: "Enviando...",
      success: () => {
        setStatus("success")
        return `"${data.titulo}" foi criado com sucesso!`
      },
      error: (error) => {
        setStatus("error")
        const errorMessageConst =
          error instanceof Error ? error.message : "Ocorreu um erro desconhecido."
        setErrorMessage(() => errorMessageConst)
        return `Erro: ${errorMessage}`
      },
    })
  }

  return (
    <main>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-raisin-black mx-auto h-fit w-fit min-w-xl space-y-4 rounded-2xl bg-white p-6 shadow"
      >
        <h1 className="text-main-dark-blue text-2xl font-semibold">Criar novo post</h1>

        {/* Campo Título (obrigatório) */}
        <FormFieldset>
          <InputLabel
            label="Título"
            htmlFor="titulo"
          />
          <Input
            type="text"
            id="titulo"
            placeholder="Insira o título"
            className={`${errors.titulo ? "ring-2 ring-red-300" : ""}`}
            {...register("titulo", { required: "Título é obrigatório" })}
          />
          {errors.titulo && <span className="text-red-400">{errors.titulo.message}</span>}
        </FormFieldset>

        {/* Campo Subtítulo (obrigatório) */}
        <FormFieldset>
          <InputLabel
            label="Subtítulo"
            htmlFor="subtitulo"
          />
          <TextAreaInput
            id="subtitulo"
            placeholder="Insira o subtítulo ou breve descrição do post"
            rows={2}
            className={`resize-none ${errors.subtitulo ? "ring-2 ring-red-300" : ""}`}
            {...register("subtitulo", { required: "Subtítulo ou descrição obrigatória" })}
          />
          {errors.subtitulo && <span className="text-red-400">{errors.subtitulo.message}</span>}
        </FormFieldset>

        {/* Campo Conteúdo (obrigatório) */}
        <FormFieldset>
          <InputLabel
            label="Conteúdo"
            htmlFor="conteudo"
          />
          <TextAreaInput
            id="conteudo"
            placeholder="Insira o conteúdo do post"
            rows={6}
            className={`resize-y ${errors.conteudo ? "ring-2 ring-red-300" : ""}`}
            {...register("conteudo", {
              required: "Conteúdo é obrigatório",
              minLength: { value: 100, message: `Mínimo de 100 caracteres` },
            })}
          />
          {errors.conteudo && <span className="text-red-400">{errors.conteudo.message}</span>}
        </FormFieldset>

        {/* Campo Imagem */}
        <FormFieldset>
          <InputLabel
            label="Imagem"
            htmlFor="imagem"
          />
          <Input
            id="imagem"
            type="file"
            accept="image/*"
            className={`${errors.imagem ? "ring-2 ring-red-300" : ""}`}
            {...register("imagem")}
          />
        </FormFieldset>

        {status === "success" ? (
          <Link
            className="transition-color flex w-full flex-row items-center justify-center gap-2 rounded bg-green-200 px-2 py-1 text-center font-medium"
            title="Ir para a página inicial"
            href="/"
          >
            Post criado, voltar para a página inicial{" "}
            <HomeIcon
              stroke="black"
              size={20}
            />
          </Link>
        ) : (
          <button
            className="block w-full cursor-pointer rounded bg-blue-100 px-2 py-1 font-medium transition-colors hover:bg-blue-200 active:bg-blue-300"
            type="submit"
            title="Criar novo post"
            disabled={status && status === "pending" ? true : false}
          >
            Criar
          </button>
        )}
      </form>
    </main>
  )
}
