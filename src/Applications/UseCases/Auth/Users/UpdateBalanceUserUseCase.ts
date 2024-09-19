import { UpdateBalanceRequestDTO } from '@Applications/DTOs/Requests/Auth/users/UpdateBalanceRequestDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { LoggerConstants } from '@Domain/Constants/LoggerConstants';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { databaseResponseTimeHistogram } from '@Infra/Metrics/metrics';
import { inject, injectable } from 'inversify';

@injectable()
export class UpdateBalanceUserUseCase {
  private readonly logger = new LoggerComponent(UpdateBalanceUserUseCase.name);

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ receivedId, amount, sender }: UpdateBalanceRequestDTO): Promise<boolean> {
    const metricsLabels = { operation: 'updateBalance' };
    const timer = databaseResponseTimeHistogram.startTimer();
    
    try {
      this.logger.info(LoggerConstants.updateBalanceLogger);

      const user = await this.usersRepository.getById(receivedId);
      if(!user)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 404);
  
      if(!user.isActive)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.userInactive), 404);
  
      await this.usersRepository.updateBalance(receivedId, user.balance + amount);
      await this.usersRepository.updateBalance(sender.id, sender.balance - amount);

      timer({ ...metricsLabels, success: 'true' });
      return false;
    
    } catch (error) {
      if(error instanceof AppError) {
        this.logger.warn(GenericErrorMessages.invalidAction, error);
        throw error;
      }

      this.logger.error(GenericErrorMessages.invalidAction, error);
      timer({ ...metricsLabels, success: 'false' });
      return true;
    }
  }
}