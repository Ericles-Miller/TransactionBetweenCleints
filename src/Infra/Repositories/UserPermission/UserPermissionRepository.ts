import { UsersPermissions } from "@prisma/client";
import { prisma } from "@Infra/Data/database";
import { injectable } from "inversify";
import { IUserPermissionsRepository } from "@Domain/Interfaces/Repositories/Auth/IUserPermissionsRepository";

@injectable()
export class UserPermissionRepository implements IUserPermissionsRepository {
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