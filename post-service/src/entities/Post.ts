import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ nullable: true })
  subtitulo?: string;

  @Column("text")
  conteudo!: string;

  @Column({ nullable: true })
  urlimagem?: string;

  @Column()
  idusuario!: number;

  @CreateDateColumn()
  dtcriacao!: Date;

  @UpdateDateColumn()
  dtalteracao!: Date;
}