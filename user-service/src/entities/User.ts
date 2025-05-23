import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  nome!: string;

  @Column({
    type: "enum",
    enum: ["Aluno", "Professor"]
  })
  role!: "Aluno" | "Professor";

  @Column({ default: true })
  ativo!: boolean;
}