import { CredentialsToken } from '@Applications/UseCases/Shared/CredentialsToken';
import { Configuration } from '@Domain/Config/Configuration';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { User } from '@Domain/Entities/Auth/User';
import { UpdateUserTokenUseCase } from './UpdateUserTokenUseCase';
import { databaseResponseTimeHistogram } from '@Infra/Metrics/metrics';


@injectable()
export abstract class CreateAccessTokensUseCase {
  constructor(
    @inject(CredentialsToken)
    private credentialsTokens : CredentialsToken, 

    @inject(UpdateUserTokenUseCase)
    private updateUserTokenUseCase : UpdateUserTokenUseCase
  ) {}
  async createAccessToken(user: User) : Promise<string> {
    const metricsLabels = { operation: 'CreateAccessTokens' };
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
      const token = jwt.sign(
        await this.credentialsTokens.generateCredentials(user),
        Configuration.authApiSecrets.secretKey!,
        { 
          subject: user.id,
          expiresIn: Configuration.authApiSecrets.tokenExpiresIn,
          algorithm: 'HS256',
          audience: Configuration.authApiSecrets.audience!,
          issuer: Configuration.authApiSecrets.issuer!,
        }
      );

      timer({ ...metricsLabels, success: 'true' });
      return token;
      
    } catch (error) {
      timer({ ...metricsLabels, success: 'false' });
      throw new Error(`Error creating access token: ${(error as Error).message}`);
    } 
  }

  async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = jwt.sign(
      await this.credentialsTokens.generateCredentials(user),
      Configuration.authApiSecrets.secretRefreshKey!,
      {
        subject: user.id,
        expiresIn: Configuration.authApiSecrets.tokenExpiresIn,
        algorithm: 'HS256',
        audience: Configuration.authApiSecrets.audience!,
        issuer: Configuration.authApiSecrets.issuer!,
      }
    );

    await this.updateUserTokenUseCase.execute(user,refreshToken);
    return refreshToken;
  }
}