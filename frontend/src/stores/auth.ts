import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthenticated: boolean
  userId: string | null
  setIsAuthenticated: (auth: boolean) => void
  setUserId: (userId: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,
      setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
      setUserId: (userId: string | null) => set({ userId }),
    }),
    {
      name: "auth-storage",
    },
  ),
)
