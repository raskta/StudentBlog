import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/models/users.models';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ nullable: true })
  subtitulo?: string;

  @Column('text')
  conteudo!: string;

  @Column({ nullable: true })
  urlimagem?: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'idusuario' })
  usuario: User | null;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'idusuarioalter' })
  usuarioAlteracao?: User;

  @CreateDateColumn()
  dtcriacao!: Date;

  @UpdateDateColumn()
  dtalteracao?: Date;
}
