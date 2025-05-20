import { ReactNode } from "react"

export default function FormFieldset({ children }: { children: ReactNode }) {
  return <fieldset className="flex flex-col gap-1">{children}</fieldset>
}
