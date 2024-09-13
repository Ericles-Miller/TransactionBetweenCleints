import { ITokensResponseDTO } from "@Applications/DTOs/Responses/Auth/ITokensResponseDTO";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { AccessTokenErrorMessages } from "@Domain/Exceptions/Errors/Auth/AccessTokenErrorMessages";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { inject, injectable } from "inversify";
import { CreateAccessTokensUseCase } from "./CreateAccessTokensUseCase";
import { MapperUser } from "@Applications/Mappings/Users/MapperUser";
import { User } from "@Domain/Entities/Auth/User";
import { RefreshAccessRequestDTO } from "@Applications/DTOs/Requests/Auth/RefreshAccessRequestDTO";
import { tokenBlacklist } from "@Api/Extensions/AuthorizedFlow";

@injectable()
export class RefreshAccessUseCase {
  private mapperUser = new MapperUser();

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject(CreateAccessTokensUseCase)
    private readonly createAccessTokenUseCase: CreateAccessTokensUseCase

  ){}

  async execute({refreshTokenCode, email, token }: RefreshAccessRequestDTO): Promise<ResponseDTO<ITokensResponseDTO>> {
    try {
      if(!refreshTokenCode || !email)
        throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
  
      const user = await this.usersRepository.getByEmail(email);
      if(!user)
        throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
  
      if(user.refreshTokenCode !== refreshTokenCode)
        throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
  
      const mapperUser = this.mapperUser.mapperUserPermissionsToUser(user);
  
      this.validateFields(mapperUser);
  
      const token = await this.createAccessTokenUseCase.createAccessToken(mapperUser);
      const refreshToken = await this.createAccessTokenUseCase.generateRefreshToken(mapperUser);
      tokenBlacklist.push(token);
      
      return new ResponseDTO<ITokensResponseDTO>({token, refreshToken}); 
    } catch (error) {
      if(error instanceof AppError)
        throw error

      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.unexpectedRefreshAccess), 500);
    }   
  }

  private validateFields(user: User): void {
    if(user.isActive === false || user.userPermissions?.length == 0)
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
  }
}