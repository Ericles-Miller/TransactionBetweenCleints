import { Configuration } from '@Domain/Config/Configuration';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export let tokenBlacklist: string[] = [];

export class AuthorizedFlow {

  authenticateToken(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
  
    if (!authToken) {
      return response.status(401).json({ message: 'Token is missing!' });
    }
  
    const [, token] = authToken.split(' ');
  
    if (!token) {
      return response.status(401).json({ message: 'Acesso negado: Token não fornecido' });
    }

    if (tokenBlacklist.includes(token)) {
      return response.status(401).json({ message: 'Access Denied'});
    }
  
    const secretToken = Configuration.authApiSecrets.secretKey;
    const jwtOptions = {
      issuer: Configuration.authApiSecrets.issuer,
      audience: Configuration.authApiSecrets.audience,
    };
  
    jwt.verify(token, secretToken, jwtOptions, (err, decoded) => {
      if (err) {
        return response.status(401).json({ message: 'Acesso negado: Token inválido ou expirado' });
      }
  
      if (typeof decoded === 'object' && decoded !== null && 'permissions' in decoded) {
        const user = decoded as JwtPayload & { email: string; name: string; permissions: string[] };
  
        request.user = user;
        next();
      } else {
        return response.status(401).json({ message: 'Acesso negado: Token inválido' });
      }
    });
  }

  authorizePermission(requiredPermission : string) {
    return (request: Request, response: Response, next : NextFunction) => {
      const userPermissions = request.user?.permissions;
  
      if (!userPermissions || !userPermissions.includes(requiredPermission)) {
        return response.status(403).json({ message: 'Não possui acesso: Permissão negada' });
      }

      next();
    };
  }
}