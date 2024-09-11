import { UserPermissions } from "@prisma/client";
import { prisma } from "@Infra/DataBase/database";
import { injectable } from "inversify";
import { IUserPermissionsRepository } from "@Domain/Interfaces/Repositories/Auth/IUserPermissionsRepository";

@injectable()
export class UserPermissionsRepository implements IUserPermissionsRepository {
  private readonly repository = prisma.userPermissions;
  
  async create(userPermissions: UserPermissions[]): Promise<void> {
    await this.repository.createMany({
      data: userPermissions
    }); 
  }
}