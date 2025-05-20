export interface User {
  id: number
  email: string
  nome: string
  role: "Aluno" | "Professor"
  ativo: boolean
}
