export class UserDto {
    id!: number;
    nome!: string;
    role!: 'Aluno' | 'Professor';
    ativo!: boolean;
    email!: string;
}
