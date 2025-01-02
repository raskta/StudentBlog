import { NextFunction, Request, Response } from "express";
import { userService } from "../service/users.service";

class UserController{
    async get(req:Request, res:Response, next: NextFunction){
        try {
            const result = await userService.get();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req:Request, res:Response, next: NextFunction){
        try {
            const id = Number(req.params.id);
            const result = await userService.getById(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req:Request, res:Response, next: NextFunction){
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'email é obrigatório' });
            }
            const result = await userService.create(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req:Request, res:Response, next: NextFunction){
        try {
            const id = Number(req.params.id);
            const result = await userService.update(id, req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req:Request, res:Response, next: NextFunction){
        try {
            const id = Number(req.params.id);
            const result = await userService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();