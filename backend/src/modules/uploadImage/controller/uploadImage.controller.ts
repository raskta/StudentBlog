import { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Nenhuma imagem enviada" });
      return;
    }

    // Criamos a URL da imagem baseada no caminho do servidor
    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("Erro no upload da imagem:", error);
    res.status(500).json({ message: "Erro ao processar o upload" });
  }
};
