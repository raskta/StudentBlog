import { create } from "zustand";
import { User } from "../../../shared/interfaces/user";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

type UsersState = {
  loading: boolean;
  users: User[];

  // Actions
  fetchUsers: () => Promise<void>;
  getUserById: (id: number) => Promise<User | undefined>;
  getUserByEmail: (email: string) => Promise<User | undefined>;
  createUser: (user: Partial<User>) => void;
  updateUser: (updated: User) => void;
  deleteUser: (id: number) => void;
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

  createUser: (user) => {
    return;
  },

  updateUser: async (updated) => {
    try {
      const response = await fetch(`${API_URL}/users/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Erro ao editar usuário: ${updated.id} - ${updated.nome}`);
      }

      const updatedUser: User = await response.json();

      set((state) => ({
        users: state.users.map((u) => (u.id === updated.id ? updated : u)),
      }));
    } catch (error) {
      console.error("Erro no updateUser:", error);
      throw error;
    }
  },

  deleteUser: async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao excluir usuário");
      }

      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (error) {
      console.error("[UsersStore] Erro ao remover usuário");
      throw error;
    }
  },
}));
