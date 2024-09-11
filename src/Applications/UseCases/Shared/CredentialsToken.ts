import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { IPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/IPermissionsRepository';
import { inject, injectable } from 'inversify';
import { UserPermissions } from '@Domain/Entities/Auth/UserPermissions';
import { Configuration } from '@Domain/Config';
import { ISubject } from '@Domain/Interfaces/Auth/ISubject';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { User } from '@Domain/Entities/Auth/User';

@injectable()
export abstract class CredentialsToken {
  
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository,
    @inject('PermissionRepository')
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async generateCredentials(user: User ): Promise<ISubject> {
    const payload = {
      email: await this.generateEmailClaims(user.email),
      name: await this.generateNameClaim(user.email),
      permissions: await this.generatePermissionsClaims(user.userPermissions!),
      audience: Configuration.authApiSecrets.audience!,
      issuer: Configuration.authApiSecrets.issuer!,
    };

    return payload;
  }

  private async generateEmailClaims(email: string) : Promise<string> {
    const userExists = await this.usersRepository.checkEmailAlreadyExist(email);
    if(!userExists) 
      throw new AppError('User not found', 404);
    return email;
  }

  private async generateNameClaim(email: string) : Promise<string> {
    const name = await this.usersRepository.findNameByEmail(email);
    if(!name)
      throw new AppError('userNot Found', 404);
    return name;
  }

  private async generatePermissionsClaims(userPermissions: UserPermissions[]): Promise<string[]> {
    let permissions = userPermissions.map(usersPermission => usersPermission.permissionId);

    permissions = await this.permissionRepository.readDescriptionsByIdsReadOnly(permissions!);
    if(!permissions)
      throw new AppError('userNot Found', 404);

    return permissions;
  }
}