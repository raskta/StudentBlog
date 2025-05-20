import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { User } from "../../../shared/interfaces/user";

type AuthState = {
  token: string | null;
  email: string | null;
  loggedUser: User | null;
  setToken: (token: string) => Promise<void>;
  setEmail: (email: string) => void;
  setLoggedUser: (user: User | null) => Promise<void>;
  removeToken: () => Promise<void>;
  logout: () => Promise<void>;
  loadTokenFromStorage: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  email: null,
  loggedUser: null,

  setToken: async (token: string) => {
    await SecureStore.setItemAsync("token", token);
    set({ token });
  },

  setEmail: (email: string) => {
    set({ email });
  },

  setLoggedUser: async (user: User | null) => {
    if (user) {
      const userJson = JSON.stringify(user);
      await SecureStore.setItemAsync("loggedUser", userJson);
      console.log("[AuthStore] Saved loggedUser:", user);
      set({ loggedUser: user, email: user.email });
    } else {
      await SecureStore.deleteItemAsync("loggedUser");
      console.log("[AuthStore] Cleared loggedUser");
      set({ loggedUser: null, email: null });
    }
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync("token");
    console.log("[AuthStore] Removed token");
    set({ token: null });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("loggedUser");
    console.log("[AuthStore] Logout – removed token & user");
    set({ token: null, email: null, loggedUser: null });
  },

  loadTokenFromStorage: async () => {
    const token = await SecureStore.getItemAsync("token");
    const userJson = await SecureStore.getItemAsync("loggedUser");

    const loggedUser = userJson ? (JSON.parse(userJson) as User) : null;

    set({
      token: token ?? null,
      loggedUser,
      email: loggedUser?.email ?? null,
    });
  },
}));
