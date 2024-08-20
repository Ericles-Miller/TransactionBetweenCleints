import { ICreateUserRequestDTO } from '@Applications/DTOs/Requests/ICreateUserRequestDTO';
import { Permission } from '@Domain/Entities/Permissions';
import { User } from '@Domain/Entities/User';
import { AppError } from '@Domain/Exceptions/AppError';
import { PermissionsExceptionsMessages } from '@Domain/Exceptions/ExceptionsMessages/PermissionsExceptionsMessages';
import { IPermissionsRepository } from '@Domain/Interfaces/Repositories/IPermissionsRepository';
import { IUsersRepository } from '@Domain/Interfaces/Repositories/IUsersRepository';
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
    // fazer um create ja inserindo as permissions do user 
    await this.usersRepository.create(user);
  }

  private async ValidatePermissions(permissions: string[]): Promise<void> {
    Promise.all(permissions.map(async (item) => {
      const permission = await this.permissionsRepository.findById(item);
      if(!permission)
        throw new AppError(PermissionsExceptionsMessages.PermissionIdNotExists, 404);
    })); 
  }
}