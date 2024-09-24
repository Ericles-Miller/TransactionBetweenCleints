import { LoginUserController } from '@Api/Controllers/Auth/LoginController';
import { LogoutController } from '@Api/Controllers/Auth/LogoutController';
import { RefreshAccessController } from '@Api/Controllers/Auth/RefreshAccessController';
import { AuthorizedFlow } from '@Api/Extensions/AuthorizedFlow';
import { Limiter } from '@Api/Extensions/Limiter';
import { Router } from 'express';

const authorizedFlow = new AuthorizedFlow();

export const authRoutes = Router();

const loginUserController = new LoginUserController();
const refreshAccessController = new RefreshAccessController();
const logoutController = new LogoutController();

authRoutes.post('/login', Limiter.authLimiter, loginUserController.handle);

authRoutes.post('/logout', Limiter.authLimiter,
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  logoutController.handle
);


authRoutes.post('/refresh-access', Limiter.authLimiter,
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  refreshAccessController.handle
);