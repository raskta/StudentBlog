"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../components/Input/Input"
import InputLabel from "../InputLabel/InputLabel"

type Inputs = {
  example: string
  exampleRequired: string
}

export default function CriarPostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({})

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <main className="container mx-auto py-6 md:py-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-raisin-black mx-auto h-96 w-fit min-w-xl space-y-4 rounded-2xl bg-white p-6 shadow"
      >
        <h1 className="text-main-dark-blue text-2xl font-semibold">Criar novo post</h1>
        <fieldset className="flex flex-col gap-1">
          <InputLabel
            label="Título"
            htmlFor="titulo"
          />
          <Input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Insira o título"
          />
        </fieldset>
      </form>
    </main>
  )
}
