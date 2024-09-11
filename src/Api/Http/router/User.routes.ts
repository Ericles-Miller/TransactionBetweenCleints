import { LoginUserController } from "@Api/Controllers/auth/LoginController";
import { CreateUserController } from "@Api/Controllers/users/CreateUserController";
import { ReadAllUserController } from "@Api/Controllers/users/ReadAllUserController";
import { Router } from "express";

export const userRouters = Router();

const creteUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const readAllUserController = new ReadAllUserController();

userRouters.post('/', creteUserController.handle);
userRouters.get('/', readAllUserController.handle);
userRouters.post('/login', loginUserController.handle);