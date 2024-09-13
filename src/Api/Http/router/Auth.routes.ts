import { LoginUserController } from "@Api/Controllers/auth/LoginController";
import { LogoutController } from "@Api/Controllers/auth/LogoutController";
import { RefreshAccessController } from "@Api/Controllers/auth/RefreshAccessController";
import { AuthorizedFlow } from "@Api/Extensions/AuthorizedFlow";
import { Router } from "express";

const authorizedFlow = new AuthorizedFlow();

export const authRoutes = Router();

const loginUserController = new LoginUserController();
const refreshAccessController = new RefreshAccessController();
const logoutController = new LogoutController();

authRoutes.post('/login', loginUserController.handle);
authRoutes.post('/logout',
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  logoutController.handle
);


authRoutes.post('/refresh-access', refreshAccessController.handle);