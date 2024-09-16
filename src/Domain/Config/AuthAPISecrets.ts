import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';

export class AuthAPISecrets {
  secretKey: string;
  secretRefreshKey: string;
  tokenExpiresIn: string;
  refreshExpiresIn: string;
  issuer: string;
  audience: string;


  constructor() {
    this.secretKey = process.env.JWT_SECRET || '';
    this.secretRefreshKey = process.env.JWT_REFRESH_SECRET || '';
    this.tokenExpiresIn = process.env.TOKEN_EXPIRES_IN || '';
    this.refreshExpiresIn = process.env.REFRESH_EXPIRES_IN || '';
    this.issuer = process.env.ISSUER || '';
    this.audience = process.env.AUDIENCE || '';
    
    this.validateEnvVariables();
  }

  validateEnvVariables() {
    if (!this.secretKey || !this.secretRefreshKey || !this.tokenExpiresIn || !this.refreshExpiresIn || !this.issuer || !this.audience) {
      throw new AppError(new ResponseDTO<string>(GenericErrorMessages.environmentNull), 404);
    }
  }
}
