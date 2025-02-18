"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type NavLinkProps = {
  label: string
  link: string
  title: string
}

export default function NavLink({ label, link, title }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === link

  return (
    <Link
      href={link}
      title={title}
      className={`${isActive ? "font-bold" : "font-normal"} text-main-dark-blue font-title`}
    >
      {label}
    </Link>
  )
}
