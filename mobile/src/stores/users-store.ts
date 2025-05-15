import { create } from "zustand";
import { User } from "../../../shared/interfaces/user";
import UsersMock from "../mocks/users";

type UsersState = {
  loading: boolean;
  users: User[];

  // Actions
  fetchUsers: () => Promise<void>;
  getUserById: (id: number) => Promise<User | undefined>;
  getUserByEmail: (email: string) => Promise<User | undefined>;
  addUser: (user: User) => void;
  updateUser: (updated: User) => void;
  removeUser: (id: number) => void;
};

export const useUsersStore = create<UsersState>((set, get) => ({
  loading: false,
  loggedUser: null,
  users: [],
  fetchUsers: async () => {
    console.log("[UsersStore] Fetching users");

    set({ loading: true });

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Ocorreu um erro ao obter usuários da API");
      }

      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error("Erro ao obter usuários da API:", error);
    }
  },
  getUserById: async (id: number) => {
    const { users, fetchUsers } = get();
    if (users.length === 0) {
      await fetchUsers();
    }
    return get().users.find((u) => u.id === id);
  },

  getUserByEmail: async (email: string) => {
    const { users, fetchUsers } = get();

    if (users.length === 0) {
      await fetchUsers();
    }

    const freshUsers = get().users;
    return freshUsers.find((u) => u.email === email);
  },

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),

  updateUser: (updated) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === updated.id ? updated : u)),
    })),
  removeUser: (id) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
    // TODO: chamar delete na api para remover da base de dados
  },
}));
