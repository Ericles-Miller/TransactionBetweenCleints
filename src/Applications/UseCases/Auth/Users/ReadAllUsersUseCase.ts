import { UserResponseDTO } from '@Applications/DTOs/Responses/Auth/Users/UserResponseDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
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
export class ReadAllUsersUseCase {
  private readonly logger = new LoggerComponent(ReadAllUsersUseCase.name);

  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository
  ) {}

  async execute(): Promise<ResponseDTO<UserResponseDTO[]>> {
    const metricsLabels = { operation: 'readAllUsers' };  
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
      this.logger.info(LoggerConstants.readAllLogger);

      const users = await this.usersRepository.readAll();
      if(users.length === 0)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.UsersEmpty), 404);

      const responses = users.map((user) => {
        return mapperUserResponse(user);
      });

      this.logger.info(LoggerConstants.finishedMethod);
      timer({ ...metricsLabels, success: 'true' });
      return new ResponseDTO<UserResponseDTO[]>(responses);
    
    } catch (error) {
      if(error instanceof AppError) {
        this.logger.warn(GenericErrorMessages.invalidAction, error);
        throw error;
      }

      this.logger.error(UserErrorMessages.unexpectedReadAll, error);
      timer({ ...metricsLabels, success: 'false' });
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedReadAll), 500);
    }
  }
}