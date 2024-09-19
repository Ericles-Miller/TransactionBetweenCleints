import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import { CreateAccessTokensUseCase } from './CreateAccessTokensUseCase';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { User } from '@Domain/Entities/Auth/User';
import { AccessTokenErrorMessages } from '@Domain/Exceptions/Errors/Auth/AccessTokenErrorMessages';
import { MapperUser } from '@Applications/Mappings/Users/MapperUser';
import { LoginRequestDTO } from '@Applications/DTOs/Requests/Auth/LoginRequestDTO';
import { TokensResponseDTO } from '@Applications/DTOs/Responses/Auth/TokensResponseDTO';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { LoggerConstants } from '@Domain/Constants/LoggerConstants';
import { databaseResponseTimeHistogram } from '@Infra/Metrics/metrics';

@injectable()
export class LoginUserUseCase {
  private readonly mapperUser = new MapperUser();
  private readonly logger = new LoggerComponent(LoginUserUseCase.name);
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository,
    @inject(CreateAccessTokensUseCase)
    private readonly createAccessTokenUseCase: CreateAccessTokensUseCase
  ) {}

  async execute({ email, password }: LoginRequestDTO) : Promise<ResponseDTO<TokensResponseDTO>> {
    const metricsLabels = { operation: 'login' };
    const timer = databaseResponseTimeHistogram.startTimer();

    this.logger.info(LoggerConstants.loginLogger);

    let findUser = await this.usersRepository.getByEmail(email);
    if(!findUser) 
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.emailOrPasswordInvalid), 404);
    
    const user = this.mapperUser.mapperUserPermissionsToUser(findUser);
        
    const passwordMatch = await compare(password, findUser.password);
    if(!passwordMatch) {
      this.logger.warn(`${AccessTokenErrorMessages.passwordLogger} ${findUser.name}.`);
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.emailOrPasswordInvalid), 404);
    }

    this.validateFields(user);
    
    const token = await this.createAccessTokenUseCase.createAccessToken(user);
    const refreshToken = await this.createAccessTokenUseCase.generateRefreshToken(user);

    timer({ ...metricsLabels, success: 'true' });
    return new ResponseDTO<TokensResponseDTO>({token, refreshToken});
  }

  private validateFields(user: User): void {
    if(user.isActive === false || user.userPermissions?.length == 0) {
      this.logger.warn(UserErrorMessages.userWithoutPermissionsOrInactive);
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
    }
  }
}