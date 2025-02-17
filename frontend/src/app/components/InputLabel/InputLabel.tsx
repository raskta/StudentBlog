interface IInputLabelProps {
  label: string
  htmlFor: string
}

export default function InputLabel({ label, htmlFor }: IInputLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm tracking-wide text-zinc-600"
    >
      {label}
    </label>
  )
}
