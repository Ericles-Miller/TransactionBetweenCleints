import { CreateUserRequestDTO } from '@Applications/DTOs/Requests/Auth/users/ICreateUserRequestDTO';
import { PrismaMapper } from '@Applications/Mappings/AutoMapping.Profile';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { Users } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { AddPermissions } from '@Applications/UseCases/Shared/AddPermissions';
import { UserResponseDTO } from '@Applications/DTOs/Responses/Auth/Users/UserResponseDTO';
import { IPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/IPermissionsRepository';
import { PermissionErrorMessages } from '@Domain/Exceptions/Errors/Auth/PermissionErrorMessages';
import { User } from '@Domain/Entities/Auth/User';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { mapperUserResponse } from '@Applications/Mappings/mapperUserResponse';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';
import { LoggerConstants } from '@Domain/Constants/LoggerConstants';
import { databaseResponseTimeHistogram } from '@Infra/Metrics/metrics';

@injectable()
export class CreateUserUseCase {
  private readonly logger = new LoggerComponent(CreateUserUseCase.name);

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository,
    @inject(AddPermissions)
    private addPermission: AddPermissions
  ) {}

  async execute({ email, name, password, permissions, balance }: CreateUserRequestDTO) : Promise<ResponseDTO<UserResponseDTO>> {
    const metricsLabels = { operation: 'createUser' };
    const timer = databaseResponseTimeHistogram.startTimer();
    
    try {
      this.logger.info(LoggerConstants.createUserLogger);

      await this.validateUser(email, permissions);

      const user = new User(name, email, balance, null);
      await user.setPassword(password)
          
      let mapper = new PrismaMapper<User, Users>(); 
      let prismaUser = mapper.map(user);
      
      prismaUser = await this.usersRepository.create(prismaUser);  
      
      await this.addPermission.execute(prismaUser.id, permissions);

      user.setCleanUpdatedAt();
      prismaUser = await this.usersRepository.updateUpdateAt(prismaUser.id, user.updatedAt);

      const response = mapperUserResponse(prismaUser);
      
      timer({ ...metricsLabels, success: 'true' });
      return new ResponseDTO<UserResponseDTO>(response);
    
    } catch (error) {
      if(error instanceof AppError) {
        this.logger.warn(GenericErrorMessages.invalidAction, error);
        throw error;
      }
  
      this.logger.error(UserErrorMessages.unexpectedCreateUser, error);
      timer({ ...metricsLabels, success: 'false' });
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedCreateUser), 500);
    }
  }

  private async validateUser(email:string, permissions: string[]) : Promise<void> {

    const user = await this.usersRepository.checkEmailAlreadyExist(email);
    if(user)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.emailExists), 400);

    if(permissions.length === 0)
      throw new AppError(new ResponseDTO<string>(PermissionErrorMessages.permissionsNull), 400);

    const findPermissions = await this.permissionRepository.readAllIdsReadOnly(permissions);
    if(findPermissions.length !== permissions.length) 
      throw new AppError(new ResponseDTO<string>(PermissionErrorMessages.arrayPermissionsError), 400);
  }
}