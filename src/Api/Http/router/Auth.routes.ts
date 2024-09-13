import { LoginUserController } from "@Api/Controllers/auth/LoginController";
import { Router } from "express";


export const authRoutes = Router();

const loginUserController = new LoginUserController();


authRoutes.post('/login', loginUserController.handle);