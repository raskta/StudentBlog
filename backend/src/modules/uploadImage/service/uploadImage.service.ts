import multer from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (_req: Request, _file, cb) {
    cb(null, "uploads/"); // Pasta onde as imagens serão salvas
  },
  filename: function (_req: Request, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext); // Nome único para evitar conflitos
  },
});

const upload = multer({ storage: storage });

export default upload;
