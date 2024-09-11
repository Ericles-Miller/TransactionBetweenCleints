import { CredentialsToken } from "@Applications/UseCases/Shared/CredentialsToken";
import { Configuration } from "@Domain/Config";
import { inject, injectable } from "inversify";
import jwt from 'jsonwebtoken';
import { User } from "@Domain/Entities/Auth/User";
import { UpdateUserTokenUseCase } from "../UpdateUserTokenUseCase";


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
      {expiresIn: Configuration.authApiSecrets.tokenExpiresIn, algorithm: 'HS256'}
    );
    
    return token;
  }

  async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = jwt.sign(
      await this.credentialsTokens.generateCredentials(user),
      Configuration.authApiSecrets.secretRefreshKey!,
      {expiresIn: Configuration.authApiSecrets.refreshExpiresIn!, algorithm: 'HS256'}
    );

    await this.updateUserTokenUseCase.execute(user,refreshToken);

    return refreshToken;
  }
}