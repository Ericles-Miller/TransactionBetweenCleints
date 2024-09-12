import { ICreateUserRequestDTO } from '@Applications/DTOs/Requests/Auth/users/ICreateUserRequestDTO';
import { PrismaMapper } from '@Applications/Mappings/AutoMapping.Profile';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { Users } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { AddPermissions } from '@Applications/UseCases/Shared/AddPermissions';
import { UserResponseDTO } from '@Applications/DTOs/Responses/Auth/Users/UserResponseDTO';
import { IPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/IPermissionsRepository';
import { PermissionErrorMessages } from '@Domain/Exceptions/Errors/Auth/PermissionErrorMessages';
import { User } from '@Domain/Entities/Auth/User';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { mapperUserResponse } from '@Applications/Mappings/mapperUserResponse';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';

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

  async execute({ email, name, password, permissions, balance }: ICreateUserRequestDTO) : Promise<ResponseDTO<UserResponseDTO>> {
    try {
      await this.validateUser(email, permissions);

      const user = new User(name, email, balance, null);
      await user.setPassword(password)
          
      let mapper = new PrismaMapper<User, Users>(); 
      let prismaUser = mapper.map(user);
      
      prismaUser = await this.usersRepository.create(prismaUser);  
      
      await this.addPermission.execute(prismaUser.id, permissions);

      user.setCleanUpdatedAt();
      const response = mapperUserResponse(prismaUser);

      return new ResponseDTO<UserResponseDTO>(response);
    } catch (error) {
      if(error instanceof AppError)
        throw error;

      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedCreateUser), 500);
    }
  }

  private async validateUser(email:string, permissions: string[]) : Promise<void> {

    const user = await this.usersRepository.checkEmailAlreadyExist(email);
    if(user)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.emailExists), 400);

    if(permissions.length === 0)
      throw new AppError(new ResponseDTO<string>(PermissionErrorMessages.permissionsNull), 400);

    const findPermissions = await this.permissionRepository.readAllIdsReadOnly(permissions);
    if(findPermissions.length !== permissions.length) 
      throw new AppError(new ResponseDTO<string>(PermissionErrorMessages.arrayPermissionsError), 400);
  }
}