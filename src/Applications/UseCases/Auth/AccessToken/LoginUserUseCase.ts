import { PrismaMapper } from "@Applications/Mappings/AutoMapping.Profile";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { compare } from "bcryptjs";
import { inject, injectable } from "inversify";
import { ILoginRequestDTO } from "@Applications/DTOs/Requests/Auth/ILoginRequestDTO";
import { CreateAccessTokensUseCase } from "./CreateAccessTokensUseCase";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { ITokensResponseDTO } from "@Applications/DTOs/Responses/Auth/ITokensResponseDTO";
import { User } from "@Domain/Entities/Auth/User";
import { AccessTokenErrorMessages } from "@Domain/Exceptions/Errors/Auth/AccessTokenErrorMessages";
import { MapperUser } from "@Applications/Mappings/Users/MapperUser";

@injectable()
export class LoginUserUseCase {
  private readonly mapperUser = new MapperUser();
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository,
    @inject(CreateAccessTokensUseCase)
    private readonly createAccessTokenUseCase: CreateAccessTokensUseCase
  ) {}

  async execute({email, password}: ILoginRequestDTO) : Promise<ResponseDTO<ITokensResponseDTO>> {
    let findUser = await this.usersRepository.getByEmail(email);
    if(!findUser) 
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.emailOrPasswordInvalid), 404);
    
    const user = this.mapperUser.mapperUserPermissionsToUser(findUser);
        
    const passwordMatch = await compare(password, findUser.password);
    if(!passwordMatch)
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.emailOrPasswordInvalid), 404);

    this.validateFields(user);
    
    const token = await this.createAccessTokenUseCase.createAccessToken(user);
    const refreshToken = await this.createAccessTokenUseCase.generateRefreshToken(user);
    return new ResponseDTO<ITokensResponseDTO>({token, refreshToken});
  }

  private validateFields(user: User): void {
    if(user.isActive === false || user.userPermissions?.length == 0)
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
  }
}