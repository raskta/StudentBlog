import Image from "next/image"
import Logo from "/public/logo.png"
import Nav from "./components/Nav/Nav"

export default function Header() {
  return (
    <header>
      <div className="container flex justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src={Logo}
            width={46}
            height={56}
            loading="eager"
            alt="Globe with a book"
            quality={100}
          />
          <p className="text-main-dark-blue text-xl font-semibold">Educational Sphere</p>
        </div>
        <Nav />
      </div>
    </header>
  )
}
