import Posts from "./components/Posts/Posts"

export default function Home() {
  return (
    <main className="container mx-auto px-8 pt-12 md:px-0">
      <h1 className="text-main-dark-blue text-3xl font-semibold">Student Blog</h1>
      <Posts />
    </main>
  )
}
