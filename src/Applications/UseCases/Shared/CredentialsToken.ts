import { User } from '@Domain/Entities/User';
import { AppError } from '@Domain/Exceptions/AppError';
import { IReadPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/Permissions/IReadPermissionsRepository';
import { IReadUserRepository } from '@Domain/Interfaces/Repositories/Users/IReadUserRepository';
import { inject, injectable } from 'inversify';
import { UsersPermission } from '@Domain/Entities/UsersPermission';
import { Configuration } from '@Domain/Config';
import { ISubject } from '@Domain/Interfaces/Auth/ISubject';

@injectable()
export abstract class CredentialsToken {
  
  constructor(
    @inject('ReadUserRepository')
    private readonly readUserRepository: IReadUserRepository,
    @inject('ReadPermissionRepository')
    private readonly readPermissionRepository: IReadPermissionRepository,
  ) {}

  async generateCredentials(user: User ): Promise<ISubject> {
    const payload = {
      email: await this.generateEmailClaims(user.email),
      name: await this.generateNameClaim(user.email),
      permissions: await this.generatePermissionsClaims(user.usersPermissions!),
      audience: Configuration.authApiSecrets.audience!,
      issuer: Configuration.authApiSecrets.issuer!,
    };

    return payload;
  }

  private async generateEmailClaims(email: string) : Promise<string> {
    const userExists = await this.readUserRepository.checkEmailAlreadyExist(email);
    if(!userExists) 
      throw new AppError('User not found', 404);
    return email;
  }

  private async generateNameClaim(email: string) : Promise<string> {
    const name = await this.readUserRepository.findNameByEmail(email);
    if(!name)
      throw new AppError('userNot Found', 404);
    return name;
  }

  private async generatePermissionsClaims(usersPermissions: UsersPermission[]): Promise<string[]> {
    let permissions = usersPermissions.map(usersPermission => usersPermission.permissionId);

    permissions = await this.readPermissionRepository.readDescriptionsByIdsReadOnly(permissions!);
    if(!permissions)
      throw new AppError('userNot Found', 404);

    return permissions;
  }
}