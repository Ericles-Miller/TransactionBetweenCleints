import { LoginUserController } from "@Api/Controllers/auth/LoginController";
import { CreateUserController } from "@Api/Controllers/users/CreateUserController";
import { ReadAllUserController } from "@Api/Controllers/users/ReadAllUserController";
import { ReadUserByIdController } from "@Api/Controllers/users/ReadUserByIdController";
import { Router } from "express";

export const userRouters = Router();

const creteUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const readAllUserController = new ReadAllUserController();
const readUserByIdController = new ReadUserByIdController();


userRouters.post('/', creteUserController.handle);
userRouters.get('/', readAllUserController.handle);
userRouters.post('/login', loginUserController.handle);
userRouters.get('/:id',readUserByIdController.handle);