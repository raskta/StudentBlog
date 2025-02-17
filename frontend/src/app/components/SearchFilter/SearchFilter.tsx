import { usePostStore } from "@/stores/post-store"
import { SearchIcon, XIcon } from "lucide-react"
import { useRef } from "react"

export default function SearchFilter() {
  const setSearchTerm = usePostStore((state) => state.setSearchTerm)
  const searchTerm = usePostStore((state) => state.searchTerm)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearInput = () => {
    setSearchTerm("")
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.focus()
    }
  }

  return (
    <section
      id="filter"
      className="mx-auto mb-6 flex w-xs items-center gap-1 rounded-full bg-blue-200 px-4 py-2 lg:mx-0"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Procure a postagem desejada"
        onChange={handleSearch}
        value={searchTerm}
        className="peer w-full appearance-none border-none bg-transparent outline-none focus:ring-0"
      />
      {searchTerm === "" ? (
        <SearchIcon className="transition-colors peer-placeholder-shown:text-gray-500" />
      ) : (
        <button
          onClick={clearInput}
          className="cursor-pointer"
          title="Limpar busca"
          type="button"
        >
          <XIcon className="text-blue-800" />
        </button>
      )}
    </section>
  )
}
