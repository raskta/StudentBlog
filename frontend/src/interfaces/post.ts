export interface Post {
  id: number
  titulo: string
  subtitulo?: string
  conteudo: string
  urlimagem?: string
  dtcriacao: Date
  dtalteracao: Date
  idusuario: number
  idusuarioalter?: number
  tituloslug: string
}
