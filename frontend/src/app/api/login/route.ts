import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hash("senha123", 10),
  },
]

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Validação de entrada
    if (!username?.trim() || !password?.trim()) {
      return NextResponse.json(
        { success: false, message: "Nome de usuário e senha são obrigatórios" },
        { status: 400 },
      )
    }

    // Encontrar usuário
    const user = users.find((u) => u.username === username)
    if (!user) {
      return NextResponse.json({ success: false, message: "Usuário inválido" }, { status: 401 })
    }

    // Verificar senha
    const passwordValid = await bcrypt.compare(password, await user.password)
    if (!passwordValid) {
      return NextResponse.json({ success: false, message: "Senha inválida" }, { status: 401 })
    }

    // Verificar secret
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET não configurado")
      return NextResponse.json(
        { success: false, message: "Erro de configuração do servidor" },
        { status: 500 },
      )
    }

    // Gerar token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    )

    // Criar resposta com cookie seguro
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
    })

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600, // 1 hora
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 },
    )
  }
}
