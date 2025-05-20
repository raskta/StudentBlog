import { forwardRef, TextareaHTMLAttributes } from "react"

interface ITextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, ITextAreaInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={`text-raisin-black rounded bg-zinc-100 px-2 py-1 inset-shadow-2xs transition-all duration-150 focus:ring-2 focus:ring-blue-400 focus:outline-none ${className}`}
      />
    )
  },
)

TextAreaInput.displayName = "TextAreaInput"

export default TextAreaInput
