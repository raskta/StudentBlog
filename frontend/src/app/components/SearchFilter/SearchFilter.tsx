import { usePostStore } from "@/stores/post-store"
import { SearchIcon, XIcon } from "lucide-react"
import { useRef } from "react"

export default function SearchFilter() {
  const setSearchTerm = usePostStore((state) => state.setSearchTerm)
  const searchTerm = usePostStore((state) => state.searchTerm)
  const inputRef = useRef<HTMLInputElement>(null)

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
      setSearchTerm("")
    }
  }

  return (
    <section
      id="filter"
      className="mb-6 flex w-xs items-center gap-1 rounded-full bg-blue-200 px-4 py-2"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Procure a postagem desejada"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="peer w-full appearance-none border-none bg-transparent outline-none focus:ring-0"
      />
      {searchTerm === "" ? (
        <SearchIcon className="transition-colors peer-placeholder-shown:text-gray-500" />
      ) : (
        <button
          onClick={clearInput}
          className="cursor-pointer"
          title="Limpar busca"
        >
          <XIcon className="text-blue-800" />
        </button>
      )}
    </section>
  )
}
