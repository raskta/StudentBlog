"use client"

import { FormProvider, UseFormReturn, SubmitHandler, FieldValues } from "react-hook-form"

type CustomFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  children: React.ReactNode
  className?: string
}

export const CustomForm = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className = "",
}: CustomFormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4 ${className}`}
      >
        {children}
      </form>
    </FormProvider>
  )
}
