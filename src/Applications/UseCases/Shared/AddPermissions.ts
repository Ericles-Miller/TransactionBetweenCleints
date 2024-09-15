import { UserPermissions } from '@Domain/Entities/Auth/UserPermissions';
import { IUserPermissionsRepository } from '@Domain/Interfaces/Repositories/Auth/IUserPermissionsRepository';
import { inject, injectable } from 'inversify';

@injectable()
export class AddPermissions {
  constructor(
    @inject('UserPermissionsRepository')
    private readonly repository: IUserPermissionsRepository,
  ) {}

  async execute(userId: string, permissions: string[]) : Promise<void> {
    
    const userPermissions = permissions.map((permission) => {
      const userPermission =  new UserPermissions(userId, permission, null);
      userPermission.setCleanUpdatedAt();
      return userPermission;
    });
    
    await this.repository.create(userPermissions)
  }
}