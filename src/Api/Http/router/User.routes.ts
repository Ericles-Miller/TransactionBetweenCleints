import { LoginUserController } from "@Api/Controllers/LoginController";
import { CreateUserController } from "@Api/Controllers/users/CreateUserController";
import { Router } from "express";

export const userRouters = Router();

const creteUserController = new CreateUserController();
const loginUserController = new LoginUserController();

userRouters.post('/', creteUserController.handle);
userRouters.post('/login', loginUserController.handle);