import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
    }),
    {
      name: "auth-storage",
    },
  ),
)
