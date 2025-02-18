"use client"

import FormFieldset from "@/app/components/FormFieldset/FormFieldset"
import { Input } from "@/app/components/Input/Input"
import InputLabel from "@/app/components/InputLabel/InputLabel"
import TextAreaInput from "@/app/components/TextAreaInput/TextAreaInput"
import { RegisterOptions, useFormContext } from "react-hook-form"

type FormFieldProps = {
  id: string
  label: string
  type?: "text" | "email" | "password" | "file" | "number"
  placeholder?: string
  isTextArea?: boolean
  rows?: number
  accept?: string
  validation?: RegisterOptions
  className?: string
  defaultValue?: string | number
}

export const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  isTextArea = false,
  rows,
  accept,
  validation,
  className = "",
  defaultValue,
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[id]

  return (
    <FormFieldset>
      <InputLabel
        label={label}
        htmlFor={id}
      />

      {isTextArea ? (
        <TextAreaInput
          id={id}
          rows={rows}
          placeholder={placeholder}
          className={`${error ? "ring-2 ring-red-300" : ""} ${className}`}
          {...register(id, validation)}
          defaultValue={defaultValue}
        />
      ) : (
        <Input
          id={id}
          type={type}
          accept={accept}
          placeholder={placeholder}
          className={`${error ? "ring-2 ring-red-300" : ""} ${className}`}
          {...register(id, validation)}
          defaultValue={defaultValue}
        />
      )}

      {error && (
        <p
          role="alert"
          className="text-red-400"
        >
          {error.message?.toString()}
        </p>
      )}
    </FormFieldset>
  )
}
