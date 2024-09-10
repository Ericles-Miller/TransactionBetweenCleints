import { LoginUserController } from "@Api/Controllers/auth/LoginController";
import { CreateUserController } from "@Api/Controllers/auth/CreateUserController";
import { Router } from "express";

export const userRouters = Router();

const creteUserController = new CreateUserController();
const loginUserController = new LoginUserController();

userRouters.post('/', creteUserController.handle);
userRouters.post('/login', loginUserController.handle);