import { UserResponseDTO } from '@Applications/DTOs/Responses/Auth/Users/UserResponseDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { GetIdRequestDTO } from '@Applications/DTOs/Shared/GetIdRequestDTO';
import { mapperUserResponse } from '@Applications/Mappings/mapperUserResponse';
import { LoggerConstants } from '@Domain/Constants/LoggerConstants';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { databaseResponseTimeHistogram } from '@Infra/Metrics/metrics';
import { inject, injectable } from 'inversify';

@injectable()
export class ReadUserByIdUseCase {
  private readonly logger = new LoggerComponent(ReadUserByIdUseCase.name);

  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository
  ) {}

  async execute({id}: GetIdRequestDTO) : Promise<UserResponseDTO> {
    const metricsLabels = { operation: 'readUsersById' };
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
      this.logger.info(LoggerConstants.readUserByIdLogger);
      
      const user = await this.usersRepository.getById(id);
      if(!user) 
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 404);
      
      const response = mapperUserResponse(user);

      this.logger.info(LoggerConstants.finishedMethod);
      timer({ ...metricsLabels, success: 'true' });

      return response;
      
    } catch (error) {
      if(error instanceof AppError) {
        this.logger.warn(GenericErrorMessages.invalidAction, error);
        timer({ ...metricsLabels, success: 'false' });

        throw error;
      }
      this.logger.error(UserErrorMessages.unexpectedReadById, error);
      timer({ ...metricsLabels, success: 'false' });

      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedReadById), 500);
    }
  }
}