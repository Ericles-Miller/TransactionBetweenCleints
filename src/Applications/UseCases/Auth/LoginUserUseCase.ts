import { PrismaMapper } from "@Applications/Mappings/AutoMapping.Profile";
import { User } from "@Domain/Entities/User";
import { AppError } from "@Domain/Exceptions/AppError";
import { IWriteUserRepository } from "@Domain/Interfaces/Repositories/Users/IWriteUserRepository";
import { UserWithPermissions } from "@Domain/Types/DataTypes/UserWithPermissions";
import { compare } from "bcryptjs";
import { inject, injectable } from "inversify";
import { CreateAccessTokenUseCase } from "./CreateAccessToken/CreateAccessTokenUseCase";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject('WriteUserRepository')
    private readonly writeUserRepository: IWriteUserRepository,
    @inject(CreateAccessTokenUseCase)
    private readonly createAccessTokenUseCase: CreateAccessTokenUseCase
  ) {}

  async execute(email: string, password: string) : Promise<string> { // aterar para DTO
    let findUser = await this.writeUserRepository.getByEmail(email);
    if(!findUser) 
      throw new AppError('Email or password incorrect!', 404);
    
    const passwordMatch = await compare(password, findUser.password);
    if(!passwordMatch)
      throw new AppError('Email or password incorrect!', 404);

    const user = this.validateFields(findUser);
    
    const token = await this.createAccessTokenUseCase.execute(user);
    return token;
  }

  private validateFields(user: UserWithPermissions): User {
    const userMapper = new PrismaMapper<UserWithPermissions, User>();
    const mappedUser: User = userMapper.mapUserWithPermissions(user);

    if(mappedUser.isActive === false || mappedUser.usersPermissions?.length == 0)
      throw new AppError('Access Denied', 400);

    return mappedUser;
  }
}