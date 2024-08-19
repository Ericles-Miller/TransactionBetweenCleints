import { ICreateUserRequestDTO } from '@Applications/DTOs/Requests/ICreateUserRequestDTO';
import { Permission } from '@Domain/Entities/Permissions';
import { IUsersRepository } from '@Domain/Interfaces/Repositories/IUsersRepository';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, name, password }: ICreateUserRequestDTO) : Promise<void> {

  }

  private async ValidatePermissions(permissions: Permission[]): Promise<void> {
    
  }
}