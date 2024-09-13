import { LoginUserController } from "@Api/Controllers/auth/LoginController";
import { RefreshAccessController } from "@Api/Controllers/auth/RefreshAccessController";
import { Router } from "express";


export const authRoutes = Router();

const loginUserController = new LoginUserController();
const refreshAccessController = new RefreshAccessController()

authRoutes.post('/login', loginUserController.handle);
authRoutes.post('/refresh-access', refreshAccessController.handle);