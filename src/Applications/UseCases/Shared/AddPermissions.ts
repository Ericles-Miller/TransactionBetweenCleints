import { UsersPermission } from "@Domain/Entities/UsersPermission";
import { AppError } from "@Domain/Exceptions/AppError";
import { IReadPermissionRepository } from "@Domain/Interfaces/Repositories/Auth/Permissions/IReadPermissionsRepository";
import { IWriteUserPermissionsRepository } from "@Domain/Interfaces/Repositories/Auth/UserPermissions/IWriteUserPermissionsRepository";
import { Users } from "@prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class AddPermissions {
  constructor(
    @inject('ReadPermissionRepository')
    private readonly readPermissionRepository: IReadPermissionRepository,
    @inject('WriteUserPermissionRepository')
    private readonly writeUserPermissionRepository: IWriteUserPermissionsRepository
  ) {}

  async execute(user: Users, permissions: string[]) : Promise<void> {
    const permissionsId = await this.readPermissionRepository.readAllIdsReadOnly(permissions);
    if(permissions.length !== permissionsId.length)
      throw new AppError('number of permissions is incorrect', 400); // alterar para classe erros userPermission

    permissionsId.map(async (permission) => {
      await this.writeUserPermissionRepository.create(
        new UsersPermission(user.id, permission)
      );
    })
  }
}