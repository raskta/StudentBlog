import { LogInIcon } from "lucide-react"
import NavLink from "./NavLink"
import Link from "next/link"

export default function Nav() {
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
              title={item.link}
            />
          </li>
        ))}
        <li>
          <Link
            href={"/login"}
            className="flex cursor-pointer items-center gap-1.5 rounded-full bg-zinc-300 px-2 py-1 transition-colors hover:bg-blue-300"
          >
            <LogInIcon
              width={16}
              height={16}
            />
            Entrar
          </Link>
        </li>
      </ul>
    </nav>
  )
}
