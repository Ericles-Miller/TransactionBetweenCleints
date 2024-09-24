import { LoginUserController } from '@Api/Controllers/Auth/LoginController';
import { LogoutController } from '@Api/Controllers/Auth/LogoutController';
import { RefreshAccessController } from '@Api/Controllers/Auth/RefreshAccessController';
import { AuthorizedFlow } from '@Api/Extensions/AuthorizedFlow';
import { limiter } from '@Api/Extensions/Limiter';
import { Router } from 'express';

const authorizedFlow = new AuthorizedFlow();

export const authRoutes = Router();

const loginUserController = new LoginUserController();
const refreshAccessController = new RefreshAccessController();
const logoutController = new LogoutController();

authRoutes.post('/login', loginUserController.handle);

authRoutes.post('/logout', limiter.authLimiter,
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  logoutController.handle
);


authRoutes.post('/refresh-access', limiter.authLimiter,
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  refreshAccessController.handle
);