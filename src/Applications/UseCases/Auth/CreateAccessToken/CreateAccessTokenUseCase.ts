import { CredentialsToken } from "@Applications/UseCases/Shared/CredentialsToken";
import { User } from "@Domain/Entities/User";
import { inject, injectable } from "inversify";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';
const JWT_EXPIRATION = '30m'; // 30 minutos

export interface ISubject {
  name: string;
  email: string;
  permissions: string[];
}

@injectable()
export abstract class CreateAccessTokenUseCase {
  constructor(
    @inject(CredentialsToken)
    private credentialsTokens : CredentialsToken, 
  ) {}
  async execute(user: User) : Promise<string> {
    const token = jwt.sign(
      await this.credentialsTokens.generateCredentials(user),
      JWT_SECRET,
      {expiresIn: JWT_EXPIRATION, algorithm: 'HS256'}
    );
    
    return token;
  }
}