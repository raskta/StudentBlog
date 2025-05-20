import { User } from "../../../shared/interfaces/user";

const Users: User[] = [
  {
    id: 1,
    email: "joao.silva@example.com",
    nome: "João Silva",
    role: "Aluno",
    ativo: true,
  },
  {
    id: 2,
    email: "maria.oliveira@example.com",
    nome: "Maria Oliveira",
    role: "Professor",
    ativo: true,
  },
  {
    id: 3,
    email: "pedro.lima@example.com",
    nome: "Pedro Lima",
    role: "Aluno",
    ativo: false,
  },
  {
    id: 4,
    email: "ana.costa@example.com",
    nome: "Ana Costa",
    role: "Professor",
    ativo: false,
  },
  {
    id: 5,
    email: "carla.santos@example.com",
    nome: "Carla Santos",
    role: "Aluno",
    ativo: true,
  },
];

export default Users;
