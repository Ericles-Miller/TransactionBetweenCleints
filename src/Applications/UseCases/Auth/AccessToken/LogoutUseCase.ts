import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { inject, injectable } from 'inversify';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { AccessTokenErrorMessages } from '@Domain/Exceptions/Errors/Auth/AccessTokenErrorMessages';
import { LogoutRequestDTO } from '@Applications/DTOs/Requests/Auth/LogoutRequestDTO';
import { tokenBlacklist } from '@Api/Extensions/AuthorizedFlow';

@injectable()
export class LogoutUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({refreshToken, userId, token}: LogoutRequestDTO) : Promise<void> {
    try {

      const user = await this.usersRepository.getById(userId);
      if(!user)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 404);
      
      if(user.refreshTokenCode !== refreshToken)
        throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.invalidToken), 401);
  
      await this.usersRepository.invalidToken(userId);

      tokenBlacklist.push(token);
    } catch (error) {
      if(error instanceof AppError)
        throw error;
      
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.unexpectedLogout), 500);
    }
  }
}