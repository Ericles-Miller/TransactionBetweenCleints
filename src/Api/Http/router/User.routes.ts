import { CreateUserController } from "@Api/Controllers/users/CreateUserController";
import { Router } from "express";

export const userRouters = Router();

const creteUserController = new CreateUserController();

userRouters.post('/', creteUserController.handle);