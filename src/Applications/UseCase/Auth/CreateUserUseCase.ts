import { ICreateUserRequestDTO } from '@Applications/DTOs/Requests/ICreateUserRequestDTO';
import { User } from '@Domain/Entities/User';
import { AppError } from '@Domain/Exceptions/AppError';
import { PermissionsExceptionsMessages } from '@Domain/Exceptions/ExceptionsMessages/PermissionsExceptionsMessages';
import { IPermissionsRepository } from '@Domain/Interfaces/Repositories/IPermissionsRepository';
import { IUsersRepository } from '@Domain/Interfaces/Repositories/IUsersRepository';
import { users } from '@Infra/Data/database';
import { PrismaClient } from '@prisma/client';
import { plainToClass, plainToInstance } from 'class-transformer';
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
    // setar o creatby do campo de user 
    //fazer o mapping de user com o objeto do prisma 

    const userMap = plainToClass(PrismaClient['users'], user)

    // fazer um create ja inserindo as permissions do user 
    await this.usersRepository.create(userMap);
  }

  private async ValidatePermissions(permissions: string[]): Promise<void> {
    Promise.all(permissions.map(async (item) => {
      const permission = await this.permissionsRepository.findById(item);
      if(!permission)
        throw new AppError(PermissionsExceptionsMessages.PermissionIdNotExists, 404);
    })); 
  }
}