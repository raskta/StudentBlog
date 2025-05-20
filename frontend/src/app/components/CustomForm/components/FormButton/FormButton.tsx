import React, { forwardRef } from "react"

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
}

const FormButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ disabled = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`w-full cursor-pointer rounded-lg bg-blue-100 p-3 font-medium transition-colors hover:bg-blue-200 active:bg-blue-300 ${
          disabled ? "cursor-not-allowed opacity-50 hover:bg-blue-100" : ""
        } ${className || ""}`}
        {...props}
      >
        {children || "Submit"}
      </button>
    )
  },
)

FormButton.displayName = "SubmitButton"

export default FormButton
