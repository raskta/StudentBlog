"use client"

import { FormField } from "@/app/components/CustomForm/components/FormField/FormField"
import { CustomForm } from "@/app/components/CustomForm/CustomForm"
import { Post } from "@/interfaces/post"
import { usePostStore } from "@/stores/post-store"
import { use, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export default function EditarPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // Usa `use()` para resolver a Promise
  const postId = Number(id) // Converte ID para número
  const form = useForm<Post>()

  const getPostById = usePostStore((state) => state.getPostById)
  const [foundPost, setFoundPost] = useState<Post | undefined>(undefined)

  useEffect(() => {
    if (postId) {
      const post = getPostById(postId)
      setFoundPost(post)
    }
  }, [postId, getPostById])

  const onSubmit: SubmitHandler<Post> = async (data) => {
    console.log(data)
  }

  return (
    <main className="mx-auto max-w-2xl p-4">
      {foundPost ? (
        <CustomForm
          form={form}
          onSubmit={onSubmit}
        >
          <h1 className="text-main-dark-blue mb-6 text-2xl font-semibold">
            Editar post &quot;{foundPost.id}&quot;
          </h1>
          <FormField
            id="titulo"
            label="Título"
            defaultValue={foundPost.titulo}
            validation={{ required: "Título é obrigatório" }}
            placeholder="Insira o título"
          />
          <FormField
            id="subtitulo"
            label="Subtítulo"
            isTextArea
            rows={2}
            defaultValue={foundPost.subtitulo}
            validation={{ required: "Subtítulo é obrigatório" }}
            placeholder="Insira o subtítulo"
          />
          <FormField
            id="conteudo"
            label="Conteúdo"
            isTextArea
            rows={8}
            defaultValue={foundPost.conteudo}
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
        </CustomForm>
      ) : (
        <p>Post não encontrado...</p>
      )}
    </main>
  )
}
