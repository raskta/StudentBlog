"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { CustomForm } from "../components/CustomForm/CustomForm"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginFormData, loginSchema } from "@/schemas/login.schema"
import { FormField } from "../components/CustomForm/components/FormField/FormField"
import FormButton from "../components/CustomForm/components/FormButton/FormButton"
import { toast } from "sonner"
import { ArrowRightIcon, LogsIcon, UserCheck } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    // Cria uma promise para o login
    const loginPromise = new Promise<string>(async (resolve, reject) => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const responseData = await response.json()

        if (!response.ok) {
          reject(new Error(responseData.message || "Erro na autenticação"))
          return
        }

        resolve(responseData)
      } catch (err) {
        reject(err)
      }
    })

    // Utiliza o toast.promise passando a promise criada
    toast.promise(loginPromise, {
      loading: "Autenticando...",
      success: () => {
        router.push("/gerenciamento")
        return "Login realizado com sucesso"
      },
      error: (err: Error) => err.message,
      closeButton: true,
    })

    // Quando a promise for resolvida, atualiza o estado e redireciona após 2 segundos
    loginPromise.then(() => {
      setIsLoggedIn(true)
      setTimeout(() => {
        router.push("/gerenciamento")
      }, 2000)
    })
  }

  return (
    <main className="mx-auto max-w-md p-4">
      {isLoggedIn ? (
        <section
          id="logged"
          className="text-center"
        >
          <div className="text-main-dark-blue mx-auto flex w-full max-w-xs items-center justify-center gap-3 rounded-lg bg-green-200 py-2.5 lg:max-w-sm">
            <UserCheck size={32} />
            <h1 className="text-2xl font-medium">Usuário logado</h1>
          </div>
          <div className="mt-4 lg:mt-10">
            <p className="mb-2 text-lg">Ir para:</p>
            <Link
              className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 transition-colors hover:bg-blue-200 active:bg-blue-300"
              href={"/gerenciamento"}
              title="Ir para a página de gerenciamento de posts"
            >
              <LogsIcon />
              Gerenciamento de Posts
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>
      ) : (
        <CustomForm
          form={form}
          onSubmit={onSubmit}
        >
          <h1 className="text-main-dark-blue mb-6 text-2xl font-semibold">Login</h1>
          <FormField
            id="username"
            label="Nome de usuário"
            validation={{ required: "Nome de usuário é obrigatório" }}
            placeholder="Insira o nome de usuário"
          />
          <FormField
            id="password"
            label="Senha"
            type="password"
            validation={{ required: "Senha é obrigatória" }}
            placeholder="Insira a senha"
          />
          <FormButton type="submit">Entrar</FormButton>
        </CustomForm>
      )}
    </main>
  )
}
