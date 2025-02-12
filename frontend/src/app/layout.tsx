import type { Metadata } from "next"
import { DM_Sans, Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header/Header"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      lang='pt-br'
      className='bg-zinc-100'
    >
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
