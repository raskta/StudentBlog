// src/schemas/login.schema.ts
import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email é obrigatório")
    .min(3, "Usuário deve ter pelo menos 3 caracteres")
    .max(20, "Usuário não pode ultrapassar 20 caracteres"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(1, "Senha deve ter no mínimo 3 caracteres")
    .max(50, "Senha não pode ultrapassar 50 caracteres"),
})

export type LoginFormData = yup.InferType<typeof loginSchema>
