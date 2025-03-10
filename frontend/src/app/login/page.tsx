"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { CustomForm } from "../components/CustomForm/CustomForm"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginFormData, loginSchema } from "@/schemas/login.schema"
import { FormField } from "../components/CustomForm/components/FormField/FormField"
import FormButton from "../components/CustomForm/components/FormButton/FormButton"
import { toast } from "sonner"
import { useAuthStore } from "@/stores/auth"

export default function LoginPage() {
  const { setIsAuthenticated } = useAuthStore()

  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    const loginPromise = new Promise<void>(async (resolve, reject) => {
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

        setIsAuthenticated(true)
        resolve()
      } catch (err) {
        reject(err)
      }
    })

    toast.promise(loginPromise, {
      loading: "Autenticando...",
      success: () => {
        window.location.href = "/gerenciamento"
        return "Login realizado com sucesso"
      },
      error: (err: Error) => err.message,
      closeButton: true,
    })
  }

  return (
    <main className="mx-auto max-w-md p-4">
      <CustomForm
        form={form}
        onSubmit={onSubmit}
      >
        <h1 className="text-main-dark-blue mb-6 text-2xl font-semibold">Login</h1>
        <FormField
          id="email"
          label="Email do usuário"
          validation={{ required: "Email é obrigatório" }}
          placeholder="Insira o email"
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
    </main>
  )
}
