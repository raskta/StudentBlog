import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"
import { decrypt } from "./app/lib/authSession"

const AUTH_COOKIE = "session"
const protectedRoutes = ["/gerenciamento", "/posts"]
const authRoute = ["/login"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoute.some((route) => pathname.startsWith(route))

  const cookieStore = await cookies()
  const cookie = cookieStore.get(AUTH_COOKIE)?.value

  let session
  try {
    if (cookie) {
      session = await decrypt(cookie)
    }
  } catch (error) {
    console.error("Falha ao descriptografar sessão:", error)
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL("/gerenciamento", req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
