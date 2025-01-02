import { Router } from 'express';
import { userController } from '../controller/users.controller';

const router = Router();

router.get("/", (req, res, next) => {
    userController.get(req, res, next);
});

router.get("/:id", (req, res, next) => {
    userController.getById(req, res, next);
});

router.post("/:id", (req, res, next) => {
    userController.getById(req, res, next);
});

router.put("/:id", (req, res, next) => {
    userController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
    userController.delete(req, res, next);
});


export default router;

