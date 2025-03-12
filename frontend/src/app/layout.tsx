import type { Metadata } from "next"
import { DM_Sans, Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header/Header"
import { Toaster } from "sonner"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Blog | EduSphere",
  description: "Um blog educacional com conteúdos diversos.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-br"
      className="bg-zinc-50"
    >
      <body
        className={`${dmSans.variable} ${inter.variable} min-h-screen bg-zinc-50 px-6 antialiased md:px-12`}
      >
        <Header />
        <div
          data-id="layout-children"
          className="px-4 py-6 md:px-8 md:py-12"
        >
          {children}
        </div>
        <Toaster
          position="bottom-center"
          richColors
          offset={72}
          mobileOffset={32}
        />
      </body>
    </html>
  )
}
