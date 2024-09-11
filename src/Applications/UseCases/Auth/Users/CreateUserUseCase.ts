import { ICreateUserRequestDTO } from '@Applications/DTOs/Requests/Auth/users/ICreateUserRequestDTO';
import { PrismaMapper } from '@Applications/Mappings/AutoMapping.Profile';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { Users } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { AddPermissions } from '@Applications/UseCases/Shared/AddPermissions';
import { UserResponseDTO } from '@Applications/DTOs/Responses/Auth/Users/UserResponseDTO';
import { IPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/IPermissionsRepository';
import { PermissionErrorMessages } from '@Domain/Exceptions/Errors/Auth/PermissionErrorMessages';
import { User } from '@Domain/Entities/Auth/User';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository,
    @inject(AddPermissions)
    private addPermission: AddPermissions
  ) {}

  async execute({ email, name, password, permissions }: ICreateUserRequestDTO) : Promise<UserResponseDTO> {
    await this.validateUser(email, permissions);

    const user = new User(name, email, null);
    await user.setPassword(password)
        
    const mapper = new PrismaMapper<User, Users>(); 
    let prismaUser = mapper.map(user);
    
    prismaUser = await this.usersRepository.create(prismaUser);  
    
    await this.addPermission.execute(prismaUser.id, permissions);

    user.setCleanUpdatedAt();
    return plainToInstance(UserResponseDTO, user);

  }

  private async validateUser(email:string, permissions: string[]) : Promise<void> {

    const user = await this.usersRepository.checkEmailAlreadyExist(email);
    if(user)
      throw new AppError('User already exists!', 400);

    const findPermissions = await this.permissionRepository.readAllIdsReadOnly(permissions);
    if(findPermissions.length !== permissions.length) 
      throw new AppError(PermissionErrorMessages.arrayPermissionsError, 400);
  }
}