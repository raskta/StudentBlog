import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'Aluno' | 'Professor';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({
    type: 'enum',
    enum: ['Aluno', 'Professor'],
  })
  role!: UserRole;

  @Column({ type: 'boolean', default: true })
  ativo!: boolean;
}
