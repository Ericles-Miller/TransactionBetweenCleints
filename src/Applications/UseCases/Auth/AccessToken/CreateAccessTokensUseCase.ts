import { CredentialsToken } from "@Applications/UseCases/Shared/CredentialsToken";
import { Configuration } from "@Domain/Config";
import { inject, injectable } from "inversify";
import jwt from 'jsonwebtoken';
import { User } from "@Domain/Entities/Auth/User";
import { UpdateUserTokenUseCase } from "./UpdateUserTokenUseCase";


@injectable()
export abstract class CreateAccessTokensUseCase {
  constructor(
    @inject(CredentialsToken)
    private credentialsTokens : CredentialsToken, 

    @inject(UpdateUserTokenUseCase)
    private updateUserTokenUseCase : UpdateUserTokenUseCase
  ) {}
  async createAccessToken(user: User) : Promise<string> {
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
    
    return token;
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