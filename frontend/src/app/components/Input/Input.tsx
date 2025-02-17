import { forwardRef, InputHTMLAttributes } from "react"

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ type, className = "", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`text-raisin-black rounded bg-zinc-100 px-2 py-1 inset-shadow-2xs transition-all duration-150 focus:ring-2 focus:ring-blue-400 focus:outline-none ${className}`}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"
