import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

type AuthState = {
  token: string | null;
  email: string | null;
  setToken: (token: string) => Promise<void>;
  setEmail: (email: string) => void;
  removeToken: () => Promise<void>;
  logout: () => Promise<void>;
  loadTokenFromStorage: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
  token: null,
  email: null,

  setToken: async (token: string) => {
    await SecureStore.setItemAsync("token", token);
    set({ token });
  },

  setEmail: (email: string) => {
    set({ email });
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ token: null });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ token: null, email: null });
  },

  loadTokenFromStorage: async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) set({ token });
  },
}));
