import { Request, Response, NextFunction } from "express";
import { CustomError } from "../shared/error/custom.error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Erros não tratados (genéricos)
  return res.status(500).json({ message: "Erro interno do servidor" });
};
