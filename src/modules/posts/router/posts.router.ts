import express from "express";
import { postController } from "../controller/posts.controller";

const route = express.Router();

route.get("/", (req, res) => {
    postController.get(req, res);
});

export default route;