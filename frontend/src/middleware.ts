import { NextResponse, type NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const privateRoutes = ["/gerenciamento"]
const authRoutes = ["/login"]
const PUBLIC_FILE = /\.(.*)$/
const DEFAULT_REDIRECT = "/gerenciamento"
const AUTH_COOKIE = "auth_token"

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const token = request.cookies.get("auth_token")?.value

  // Ignorar arquivos públicos e rotas da API
  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next()
  }

  // Verificar rotas privadas primeiro
  if (isPrivateRoute(pathname)) {
    return handlePrivateRoute(request, token, pathname)
  }

  // Verificar rotas de autenticação
  if (isAuthRoute(pathname)) {
    return handleAuthRoute(request, token, searchParams)
  }

  return NextResponse.next()
}

// Helper functions
function shouldSkipMiddleware(pathname: string): boolean {
  return pathname.startsWith("/_next") || pathname.includes("/api/") || PUBLIC_FILE.test(pathname)
}

function isPrivateRoute(pathname: string): boolean {
  return privateRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.includes(pathname)
}

async function handlePrivateRoute(
  request: NextRequest,
  token: string | undefined,
  pathname: string,
) {
  try {
    if (!token) throw new Error("Acesso não autorizado")

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { exp: number }

    // Verificar expiração do token
    if (Date.now() >= decoded.exp * 1000) {
      throw new Error("Sessão expirada")
    }

    return NextResponse.next()
  } catch (error) {
    console.error(`Erro na rota privada [${pathname}]:`, error)

    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)

    // Limpar cookie inválido
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete(AUTH_COOKIE)

    return response
  }
}

async function handleAuthRoute(
  request: NextRequest,
  token: string | undefined,
  searchParams: URLSearchParams,
) {
  try {
    // Se não tem token, permite acesso à rota de login
    if (!token) return NextResponse.next()

    // Verificar token válido
    jwt.verify(token, process.env.JWT_SECRET!)

    // Redirecionar para URL válida
    const redirectPath = validateRedirectPath(searchParams.get("redirect") || DEFAULT_REDIRECT)

    return NextResponse.redirect(new URL(redirectPath, request.url))
  } catch (error) {
    // Se token é inválido, limpar e permitir login
    console.error("Erro na rota de autenticação:", error)
    const response = NextResponse.next()
    response.cookies.delete(AUTH_COOKIE)
    return response
  }
}

function validateRedirectPath(path: string): string {
  // Garantir que o redirecionamento é para uma rota permitida
  const isValid = privateRoutes.some((route) => path.startsWith(route))
  return isValid ? path : DEFAULT_REDIRECT
}
