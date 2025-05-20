// src/controllers/auth.controller.ts

import { Request, Response } from "express";
import { getUserByEmail } from "../../users/repository/users.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const isPasswordValid = password === user.id.toString();

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // Gera o token JWT com validade de 1 hora
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      return res.json({
        message: "Login realizado com sucesso",
        token,
        userId: user.id,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.json({ message: "Logout realizado com sucesso" });
  }
}

export const authController: { login: Function; logout: Function } =
  new AuthController();
