import { UsersPermissions } from "@prisma/client";
import { prisma } from "@Infra/Data/database";
import { injectable } from "inversify";
import { IWriteUserPermissionsRepository } from "@Domain/Interfaces/Repositories/Auth/UserPermissions/IWriteUserPermissionsRepository";

@injectable()
export class UserPermissionRepository implements IWriteUserPermissionsRepository {
  private readonly repository = prisma.usersPermissions;
  
  async create(permission: UsersPermissions): Promise<void> {
    await this.repository.create({
      data: permission
    }); 
  }

  companyCountAdminsAsync(): Promise<number> {
    throw new Error("Method not implemented.");
  }
  
  delete(userId: string, permissionId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}