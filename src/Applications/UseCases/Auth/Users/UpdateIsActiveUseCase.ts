import { UserIsActiveRequestDTO } from '@Applications/DTOs/Requests/Auth/users/UserIsActiveRequestDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { MapperUser } from '@Applications/Mappings/Users/MapperUser';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { inject, injectable } from 'inversify';


@injectable()
export class UpdateIsActiveUseCase {
  private readonly mapperUser = new MapperUser()
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository,    
  ) {}

  async execute({id, isActive}: UserIsActiveRequestDTO) : Promise<void> {
    try {
      const user = await this.usersRepository.getById(id);
      if(!user)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 404);
  
      const mapperUser = this.mapperUser.mapperPrismaToUser(user);
      mapperUser.setIsActive(isActive);
  
      await this.usersRepository.updateIsActive(id, mapperUser.isActive);
    } catch (error) {
      if(error instanceof AppError)
        throw error;

      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedUpdateIsActive), 500);
    }
  }
}