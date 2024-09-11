import { PrismaMapper } from "@Applications/Mappings/AutoMapping.Profile";
import { User } from "@Domain/Entities/User";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { UserWithPermissions } from "@Domain/Types/DataTypes/UserWithPermissions";
import { compare } from "bcryptjs";
import { inject, injectable } from "inversify";
import { ILoginRequestDTO } from "@Applications/DTOs/Requests/Auth/ILoginRequestDTO";
import { CreateAccessTokensUseCase } from "./CreateAccessTokensUseCase";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { ILoginResponseDTO } from "@Applications/DTOs/Responses/Auth/ILoginResponseDTO";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject('WriteUserRepository')
    private readonly writeUserRepository: IUserRepository,
    @inject(CreateAccessTokensUseCase)
    private readonly createAccessTokenUseCase: CreateAccessTokensUseCase
  ) {}

  async execute({email, password}: ILoginRequestDTO) : Promise<ResponseDTO<ILoginResponseDTO>> {
    let findUser = await this.writeUserRepository.getByEmail(email);
    if(!findUser) 
      throw new AppError('Email or password incorrect!', 404);
    
    const prismaMapper = new PrismaMapper<any, User>();
    const user = prismaMapper.mapPrismaUserToDomainUser(findUser);
        
    const passwordMatch = await compare(password, findUser.password);
    if(!passwordMatch)
      throw new AppError('Email or password incorrect!', 404);

    this.validateFields(user);
    
    const token = await this.createAccessTokenUseCase.createAccessToken(user);
    const refreshToken = await this.createAccessTokenUseCase.generateRefreshToken(user);
    return new ResponseDTO<ILoginResponseDTO>({token, refreshToken});
  }

  private validateFields(user: User): void {
    if(user.isActive === false || user.usersPermissions?.length == 0)
      throw new AppError('Access Denied', 400);
  }
}