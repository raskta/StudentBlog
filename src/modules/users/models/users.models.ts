import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../../posts/models/posts.models';

export type UserRole = 'Aluno' | 'Professor';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'enum', enum: ['Aluno', 'Professor'] })
  role!: 'Aluno' | 'Professor';

  @Column({ type: 'boolean', default: true })
  ativo!: boolean;

  @OneToMany(() => Post, (post) => post.usuario)
  posts?: Post[];
}
