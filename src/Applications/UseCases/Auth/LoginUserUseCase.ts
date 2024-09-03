import { PrismaMapper } from "@Applications/Mappings/AutoMapping.Profile";
import { User } from "@Domain/Entities/User";
import { AppError } from "@Domain/Exceptions/AppError";
import { IWriteUserRepository } from "@Domain/Interfaces/Repositories/Users/IWriteUserRepository";
import { UserWithPermissions } from "@Infra/Data/database";
import { compare } from "bcryptjs";
import { inject, injectable } from "inversify";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject('WriteUserRepository')
    private readonly writeUserRepository: IWriteUserRepository
  ) {}

  async execute(email: string, password: string) : Promise<void> { // aterar para DTO
    const user = await this.writeUserRepository.getByEmail(email);
    if(!user) 
      throw new AppError('Email or password incorrect!', 404);
    
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch)
      throw new AppError('Email or password incorrect!', 404);

    this.validateFields(user);

    // ler as permissioes 
    // gerar o token com as permissoes 
    // att o dados de login do user 
    /**
     * Refresh token code
      Último login
      Data de verificação do código
      Data de expiração do código nula
     */

    
  }

  private validateFields(user: UserWithPermissions): void {
    // faz o mapping de user e da classe 
    const userMapper = new PrismaMapper<UserWithPermissions, User>();
    const mappedUser: User = userMapper.map(user);

    if(mappedUser.isActive === false || mappedUser.usersPermissions.length == 0)
      throw new AppError('Access Denied', 400);

    // fazer mais validacoes
  }
}