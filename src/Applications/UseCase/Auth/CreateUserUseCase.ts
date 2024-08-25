import { ICreateUserRequestDTO } from '@Applications/DTOs/Requests/ICreateUserRequestDTO';
import { PrismaMapper } from '@Applications/Mappings/AutoMapping.Profile';
import { User } from '@Domain/Entities/User';
import { AppError } from '@Domain/Exceptions/AppError';
import { PermissionsExceptionsMessages } from '@Domain/Exceptions/ExceptionsMessages/PermissionsExceptionsMessages';
import { IPermissionsRepository } from '@Domain/Interfaces/Repositories/IPermissionsRepository';
import { IUsersRepository } from '@Domain/Interfaces/Repositories/IUsersRepository';
import { Users } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PermissionRepository')
    private permissionsRepository: IPermissionsRepository
  ) {}

  async execute({ email, name, password, permissions }: ICreateUserRequestDTO) : Promise<void> {
    this.ValidatePermissions(permissions);

    const user = new User(name, password, email, null);
    const mapper = new PrismaMapper<User, Users>(); 
    const prismaUser = mapper.map(user);

    await this.usersRepository.create(prismaUser);  
  }

  private async ValidatePermissions(permissions: string[]): Promise<void> {
    Promise.all(permissions.map(async (item) => {
      const permission = await this.permissionsRepository.findById(item);
      if(!permission)
        throw new AppError(PermissionsExceptionsMessages.PermissionIdNotExists, 404);
    })); 
  }
}