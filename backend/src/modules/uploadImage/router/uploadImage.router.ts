import express from "express";
import upload from "../service/uploadImage.service";
import { uploadImage } from "../controller/uploadImage.controller";

const router = express.Router();

// Define a rota para upload de imagens
router.post("/", upload.single("file"), uploadImage);

export default router;
