import express from "express";
import { postController } from "../controller/posts.controller";

const route = express.Router();

route.get("/", (req, res) => {
    postController.get(req, res);
});

route.get("/search", (req, res, next) => {
    postController.search(req, res, next);
});

route.get("/:id", (req, res, next) => {
    postController.getbyId(req, res, next);
});

route.post("/", (req, res, next) => {
    postController.create(req, res, next);
});

route.put("/:id", (req, res, next) => {
    postController.update(req, res, next);
});

route.delete("/:id", (req, res, next) => {
    postController.delete(req, res, next);
});

export default route;