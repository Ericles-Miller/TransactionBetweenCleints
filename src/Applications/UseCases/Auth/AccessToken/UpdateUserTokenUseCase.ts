import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { User } from '@Domain/Entities/Auth/User';
import { AccessTokenErrorMessages } from '@Domain/Exceptions/Errors/Auth/AccessTokenErrorMessages';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { databaseResponseTimeHistogram } from '@Infra/Metrics/metrics';
import { AuthUserRepository } from '@Infra/Repositories/Auth/AuthUserRepository';
import { inject, injectable } from 'inversify';

@injectable()
export class UpdateUserTokenUseCase {
  constructor(
    @inject('AuthUserRepository')
    private authUserRepository: AuthUserRepository
  ) {}

  async execute(user: User, refreshToken: string) : Promise<void> {
    const metricsLabels = { operation: 'UpdateUserToken' };
    const timer = databaseResponseTimeHistogram.startTimer();

    const findUser = await this.authUserRepository.authGetByEmail(user.email);
    if(!findUser) 
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 400);

    if(findUser.isActive === false)
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 400);

    user.setRefreshToken(refreshToken);
    user.setLatLogin();
    user.setUpdatedAt();

    timer({ ...metricsLabels, success: 'true' });
    await this.authUserRepository.updateUserRefreshToken(user);
  }
}