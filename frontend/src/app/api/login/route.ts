import { createSession, decrypt } from "@/app/lib/authSession"
import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const message = responseData.message || "Erro na autenticação"
      return new Response(JSON.stringify({ message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    await createSession(responseData.userId)

    return new Response(
      JSON.stringify({
        message: "Sessão criada com sucesso!",
        user: responseData.user,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error("Erro no POST /login:", error)
    let message = "Erro interno no servidor"

    // Exemplo de tratamento específico para erro de resolução DNS
    if (error instanceof Error && error.message.includes("getaddrinfo EAI_AGAIN")) {
      message =
        "Não foi possível resolver o endereço do servidor de autenticação. Verifique a configuração da URL."
    } else if (process.env.NODE_ENV !== "production" && error instanceof Error) {
      // Em ambiente de desenvolvimento, retorna a mensagem de erro detalhada
      message = error.message
    }

    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function GET() {
  const cookieStore = cookies()
  const cookie = (await cookieStore).get("session")?.value

  if (!cookie) {
    return new Response(
      JSON.stringify({
        authenticated: false,
        message: "Não autenticado. Cookie de sessão não encontrado.",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    )
  }

  try {
    const session = await decrypt(cookie)

    if (!session?.userId) {
      return new Response(
        JSON.stringify({
          authenticated: false,
          message: "Sessão inválida ou expirada.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      )
    }

    return new Response(
      JSON.stringify({
        authenticated: true,
        userId: session.userId,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error("Erro no GET /login:", error)
    let message = "Erro ao decodificar a sessão."

    if (process.env.NODE_ENV !== "production" && error instanceof Error) {
      message = error.message
    }

    return new Response(
      JSON.stringify({
        authenticated: false,
        message,
      }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    )
  }
}
