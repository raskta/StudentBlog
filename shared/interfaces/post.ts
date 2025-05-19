import { User } from "./user";

export interface Post {
  id: number;
  titulo: string;
  subtitulo?: string;
  conteudo: string;
  urlimagem?: string;
  dtcriacao: Date;
  dtalteracao: Date;
  usuario: User | null;
  usuarioAlteracao: User;
  tituloslug?: string;
}
