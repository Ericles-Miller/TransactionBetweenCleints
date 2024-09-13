import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { inject } from "inversify";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { UserErrorMessages } from "@Domain/Exceptions/Errors/Auth/UserErrorMessages";
import { AccessTokenErrorMessages } from "@Domain/Exceptions/Errors/Auth/AccessTokenErrorMessages";
import { LogoutRequestDTO } from "@Applications/DTOs/Requests/Auth/LogoutRequestDTO";


export class Logout {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({refreshToken, userId}: LogoutRequestDTO) : Promise<void> {
    const user = await this.usersRepository.getById(userId);
    if(!user)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 404);
    
    if(user.refreshTokenCode !== refreshToken)
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.invalidToken), 401);

    await this.usersRepository.invalidToken(userId);
  }
}