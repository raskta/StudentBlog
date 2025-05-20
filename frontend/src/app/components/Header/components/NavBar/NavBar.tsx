"use client"

import { useAuthStore } from "@/stores/auth"
import NavLink from "./NavLink"
import { LogOutIcon } from "lucide-react"
import { toast } from "sonner"

export default function Nav() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore()

  const endSession = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" })
      setIsAuthenticated(false)
      window.location.href = "/login"
    } catch (error) {
      console.error("Erro ao encerrar sessão:", error)
    }
  }

  const links = [
    {
      label: "Início",
      link: "/",
      title: "Ir para a página de Início",
    },
    {
      label: "Gerenciamento",
      link: "/gerenciamento",
      title: "Ir para a página de Gerenciamento de postagens",
    },
  ]

  return (
    <nav className="content-center">
      <ul className="flex items-center gap-4">
        {links.map((item) => (
          <li key={item.link}>
            <NavLink
              label={item.label}
              link={item.link}
              title={item.title}
            />
          </li>
        ))}
        {isAuthenticated && (
          <li>
            <button
              onClick={() => {
                endSession()
                toast.info("Você saiu da conta com sucesso", { closeButton: true })
              }}
              type="button"
              title="Sair da conta"
              className="cursor-pointer rounded-full bg-red-200 p-2 transition-colors hover:bg-red-300 active:bg-red-400"
            >
              <LogOutIcon
                size={20}
                className="text-raisin-black"
              />
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
