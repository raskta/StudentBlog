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
}

export const userController = new UserController();