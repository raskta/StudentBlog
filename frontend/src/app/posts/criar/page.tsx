"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { usePostStore } from "@/stores/post-store";
import { useAuthStore } from "@/stores/auth";
import Link from "next/link";
import { HomeIcon, ArrowLeft } from "lucide-react";
import { CustomForm } from "@/app/components/CustomForm/CustomForm";
import { FormField } from "@/app/components/CustomForm/components/FormField/FormField";
import FormButton from "@/app/components/CustomForm/components/FormButton/FormButton";

export type Inputs = {
  titulo: string;
  subtitulo: string;
  conteudo: string;
  imagem: FileList | string;
  idusuario: string;
};

export default function CriarPostPage() {
  const form = useForm<Inputs>();
  const createPost = usePostStore((state) => state.createPost);
  const userId = useAuthStore((state) => state.userId);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  // Função para fazer upload da imagem
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro no upload da imagem");
      }

      return data.url;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      toast.error("Erro ao fazer upload da imagem.");
      return null;
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!userId) {
      toast.error("Erro: Usuário não autenticado.");
      return;
    }

    setStatus("pending");

    try {
      let imageUrl = "";

      if (data.imagem.length > 0) {
        const file = data.imagem[0] as File;
        imageUrl = await uploadImage(file) ?? "";
      }

      await createPost({
        titulo: data.titulo,
        subtitulo: data.subtitulo,
        conteudo: data.conteudo,
        imagem: imageUrl,
        idusuario: userId,
      });

      setStatus("success");
      toast.success(`"${data.titulo}" foi criado com sucesso!`);
    } catch (error) {
      setStatus("error");
      toast.error(error instanceof Error ? error.message : "Erro desconhecido");
    }
  };

  return (
    <main className="mx-auto max-w-2xl p-4">
      <Link
        className="hover:text-main-dark-blue mb-6 flex w-fit items-center gap-0.5 text-sm text-zinc-500 transition-colors"
        href={"/gerenciamento"}
        title="Voltar para a página anterior"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>

      <CustomForm form={form} onSubmit={onSubmit}>
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

        <FormField id="imagem" label="Imagem" type="file" accept="image/*" className="mb-6" />

        {status === "success" ? (
          <Link
            className="flex items-center justify-center gap-2 rounded-lg bg-green-100 p-3 transition-colors hover:bg-green-200"
            href="/"
          >
            Post criado, voltar para Home
            <HomeIcon size={20} className="text-gray-800" />
          </Link>
        ) : (
          <FormButton type="submit" title="Criar post" disabled={status === "pending"}>
            {status === "pending" ? "Enviando..." : "Criar Post"}
          </FormButton>
        )}
      </CustomForm>
    </main>
  );
}
