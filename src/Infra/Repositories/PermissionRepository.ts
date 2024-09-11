import { injectable } from "inversify";
import { Permissions } from "@prisma/client";
import { IPermissionRepository } from "@Domain/Interfaces/Repositories/Auth/IPermissionsRepository";
import { prisma } from "@Infra/Data/database";
import { ETypePermission } from "@Domain/Enums/ETypePermissions";

@injectable()
export class PermissionRepository implements IPermissionRepository {
  private readonly repository = prisma.permissions;

  async readAllWithFilterReadOnly(type: ETypePermission): Promise<Permissions[]> {
    const permissions = await this.repository.findMany({ 
      where: { description: {
        contains: type.toString(),
      }},
    });
    return permissions;
  }

  async readAllIdsReadOnly(ids: string[]): Promise<string[]> {
    const permissions = await this.repository.findMany({
      where: { id: { in: ids }},
      select: { id: true}
    });

    return permissions.map(permission => permission.id); 
  }
  
  async readDescriptionsByIdsReadOnly(ids: string[]): Promise<string[]> {
    const permissions = await this.repository.findMany({
      where: { id: { in: ids }},
      select: { description: true}
    });

    return permissions.map(permission => permission.description);
  }

  async listAllPermission(): Promise<Permissions[]> {
    const permissions = await this.repository.findMany();
    return permissions;
  }
}