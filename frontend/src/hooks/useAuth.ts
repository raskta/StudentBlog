import { useEffect, useState } from "react"

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/login", { credentials: "include" })
        if (!res.ok) throw new Error("Erro na autenticação")

        const data = await res.json()
        setIsAuthenticated(data.authenticated)
      } catch {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  return { isAuthenticated }
}
