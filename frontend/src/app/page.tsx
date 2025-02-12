import Posts from "./components/Posts/Posts"

export default function Home() {
  return (
    <main className="container pt-12">
      <h1 className="text-main-dark-blue text-3xl font-semibold">Student Blog</h1>
      <Posts />
    </main>
  )
}
