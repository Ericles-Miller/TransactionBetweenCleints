import { IUserPermissionsRepository } from "@Domain/Interfaces/Repositories/Auth/IUserPermissionsRepository";
import { UserPermissions } from "@prisma/client";

export class UserPermissionsRepositoryInMemory implements IUserPermissionsRepository {
  private readonly usersPermissions: UserPermissions[] = [];
  async create(usersPermission: UserPermissions[]): Promise<void> {
    usersPermission.map(async (userPermission) => {
      usersPermission.push(userPermission);
    });
  }

}