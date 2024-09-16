import { UpdateUserRequestDTO } from '@Applications/DTOs/Requests/Auth/users/UPdateUserRequestDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { PrismaMapper } from '@Applications/Mappings/AutoMapping.Profile';
import { LoggerConstants } from '@Domain/Constants/LoggerConstants';
import { User } from '@Domain/Entities/Auth/User';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { Users } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
export  class UpdateUserUseCase { 
  private readonly logger = new LoggerComponent(UpdateUserUseCase.name);
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ){}

  async execute({balance, id, name, password}: UpdateUserRequestDTO) : Promise<void> {
    try {
      this.logger.info(LoggerConstants.UpdateUser);

      const findUser = await this.usersRepository.getById(id);
      if(!findUser)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidUser), 404);
  
      const user = new User(name, findUser.email, balance, id);
      await user.setPassword(password);
  
      let mapper = new PrismaMapper<User, Users>(); 
      let prismaUser = mapper.map(user);
  
      await this.usersRepository.update(prismaUser); 
    } catch (error) {
      if(error instanceof AppError) {
        this.logger.warn(GenericErrorMessages.invalidAction, error);
        throw error;
      }
      this.logger.error(UserErrorMessages.unexpectedUpdate, error);
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedUpdate), 500);
    }

  }
}