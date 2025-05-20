type Role = 'Aluno' | 'Professor';

export class UserDto {
    id!: number;
    nome!: string;
    role!: Role;
    ativo!: boolean;
    email!: string;
}
