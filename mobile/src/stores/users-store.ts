import { create } from "zustand";
import { User } from "../../../shared/interfaces/user";
import UsersMock from "../mocks/users";

type UsersState = {
  loading: boolean;
  loggedUser: User | null;
  users: User[];

  // Actions
  fetchUsers: () => Promise<void>;
  getUserById: (id: number) => Promise<User | undefined>;
  setLoggedUser: (user: User | null) => void;
  addUser: (user: User) => void;
  updateUser: (updated: User) => void;
  removeUser: (id: number) => void;
};

export const useUsersStore = create<UsersState>((set, get) => ({
  loading: false,
  loggedUser: null,
  users: [],
  fetchUsers: async () => {
    console.log("Fetching users");
    set({ loading: true });
    set({ users: UsersMock, loading: false });
  },
  getUserById: async (id: number) => {
    const { users, fetchUsers } = get();
    if (users.length === 0) {
      await fetchUsers();
    }
    return get().users.find((u) => u.id === id);
  },
  setLoggedUser: (user) => set({ loggedUser: user }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),

  updateUser: (updated) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === updated.id ? updated : u)),
      loggedUser: state.loggedUser?.id === updated.id ? updated : state.loggedUser,
    })),
  removeUser: (id) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
      loggedUser: state.loggedUser?.id === id ? null : state.loggedUser,
    }));
    // TODO: chamar delete na api para remover da base de dados
  },
}));
