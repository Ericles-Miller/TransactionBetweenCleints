import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { AccessTokenErrorMessages } from '@Domain/Exceptions/Errors/Auth/AccessTokenErrorMessages';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { inject, injectable } from 'inversify';
import { CreateAccessTokensUseCase } from './CreateAccessTokensUseCase';
import { MapperUser } from '@Applications/Mappings/Users/MapperUser';
import { User } from '@Domain/Entities/Auth/User';
import { RefreshAccessRequestDTO } from '@Applications/DTOs/Requests/Auth/RefreshAccessRequestDTO';
import { TokensResponseDTO } from '@Applications/DTOs/Responses/Auth/TokensResponseDTO';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { databaseResponseTimeHistogram } from '@Infra/Metrics/metrics';
import { LoggerConstants } from '@Domain/Constants/LoggerConstants';
import { BlackListToken } from '@Api/Extensions/blackListToken';

@injectable()
export class RefreshAccessUseCase {
  private readonly mapperUser = new MapperUser();
  private readonly logger = new LoggerComponent(RefreshAccessUseCase.name);
  private readonly blackListTokens = new BlackListToken();

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject(CreateAccessTokensUseCase)
    private readonly createAccessTokenUseCase: CreateAccessTokensUseCase

  ){}

  async execute({refreshTokenCode, userId, token }: RefreshAccessRequestDTO): Promise<ResponseDTO<TokensResponseDTO>> {
    const metricsLabels = { operation: 'refreshAccessToken' };
    const timer = databaseResponseTimeHistogram.startTimer();
    
    try {
      if(!refreshTokenCode || !userId)
        throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);

      if(!token)
        throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401)

      const user = await this.usersRepository.getByIdWithPermissions(userId);
      if(!user)
        throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
  
      if(user.refreshTokenCode !== refreshTokenCode)
        throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
  
      const mapperUser = this.mapperUser.mapperUserPermissionsToUser(user);
  
      this.validateFields(mapperUser);
  
      const newToken = await this.createAccessTokenUseCase.createAccessToken(mapperUser);
      const refreshToken = await this.createAccessTokenUseCase.generateRefreshToken(mapperUser);
      
      this.blackListTokens.addTokenBlackList(token);
      this.blackListTokens.removeExpTokens();

      this.logger.info(LoggerConstants.finishedMethod);
      timer({ ...metricsLabels, success: 'true' });

      return new ResponseDTO<TokensResponseDTO>({token: newToken, refreshToken}); 
    } catch (error) {
      if(error instanceof AppError) {
        throw error
      }

      this.logger.error(AccessTokenErrorMessages.unexpectedRefreshAccess, error);
      timer({ ...metricsLabels, success: 'false' });
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.unexpectedRefreshAccess), 500);
    }   
  }

  private validateFields(user: User): void {
    if(user.isActive === false || user.userPermissions?.length === 0) {
      this.logger.warn(UserErrorMessages.userWithoutPermissionsOrInactive);
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
    }
  }
}