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
  description: "",
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
        className={`${dmSans.variable} ${inter.variable} container mx-auto px-6 antialiased md:px-0`}
      >
        <Header />
        <div
          data-id="layout-children"
          className="py-6 md:py-16"
        >
          {children}
        </div>
        <Toaster
          position="bottom-center"
          richColors
        />
      </body>
    </html>
  )
}
