export interface PostDTO {
  id?: number;
  titulo: string;
  subtitulo?: string;
  conteudo: string;
  urlimagem?: string;
  idusuario: number;
  dtcriacao?: Date;
  dtalteracao?: Date;
  idusuarioalter?: number;
}
