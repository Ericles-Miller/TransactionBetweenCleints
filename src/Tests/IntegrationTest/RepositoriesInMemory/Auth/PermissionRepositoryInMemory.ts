import { ETypePermission } from "@Domain/Enums/Auth/ETypePermissions";
import { IPermissionRepository } from "@Domain/Interfaces/Repositories/Auth/IPermissionsRepository";
import { Permissions } from "@prisma/client";



export class PermissionRepositoryInMemory implements IPermissionRepository {
  private readonly permissions: Permissions[] = [];
  listAllPermission(): Promise<Permissions[]> {
    throw new Error("Method not implemented.");
  }
  readAllWithFilterReadOnly(type: ETypePermission): Promise<Permissions[]> {
    throw new Error("Method not implemented.");
  }
  async readAllIdsReadOnly(ids: string[]): Promise<string[]> {
    const permissions = this.permissions.filter(permission => ids.includes(permission.id));
    return permissions.map(permission => permission.id);
  }

  readDescriptionsByIdsReadOnly(ids: string[]): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  
}