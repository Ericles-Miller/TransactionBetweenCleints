import { ICreateUserRequestDTO } from '@Applications/DTOs/Requests/users/ICreateUserRequestDTO';
import { PrismaMapper } from '@Applications/Mappings/AutoMapping.Profile';
import { User } from '@Domain/Entities/User';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { Users } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { AddPermissions } from '@Applications/UseCases/Shared/AddPermissions';
import { UserResponseDTO } from '@Applications/DTOs/Responses/Users/UserResponseDTO';
import { UserValidator } from '@Domain/Validator/Auth/UserValidator';
import { IPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/IPermissionsRepository';

@injectable()
export class CreateUserUseCase {
  private readonly validator = new UserValidator()
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository,

    @inject(AddPermissions)
    private addPermission: AddPermissions
  ) {}

  async execute({ email, name, password, permissions }: ICreateUserRequestDTO) : Promise<UserResponseDTO> {
    await this.validateUser({ email, name, permissions});

    const user = new User(name, email, null);
    await user.setPassword(password)
        
    const mapper = new PrismaMapper<User, Users>(); 
    let prismaUser = mapper.map(user);
    
    prismaUser = await this.usersRepository.create(prismaUser);  
    
    await this.addPermission.execute(prismaUser, permissions);

    // send email 
    return plainToInstance(UserResponseDTO, user);

  }

  private async validateUser({email, name, password, permissions}: ICreateUserRequestDTO) : Promise<void> {
    this.validator.validateEmail(email);

    const user = await this.usersRepository.checkEmailAlreadyExist(email);
    if(user)
      throw new AppError('User already exists!', 400);

    const permission = await this.permissionRepository.checkExists(permissions);

  }
}