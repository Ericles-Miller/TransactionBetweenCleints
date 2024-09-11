import { UsersPermission } from "@Domain/Entities/UsersPermission";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { IPermissionRepository } from "@Domain/Interfaces/Repositories/Auth/IPermissionsRepository";
import { IUserPermissionsRepository } from "@Domain/Interfaces/Repositories/Auth/IUserPermissionsRepository";
import { Users } from "@prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class AddPermissions {
  constructor(
    @inject('ReadPermissionRepository')
    private readonly readPermissionRepository: IPermissionRepository,
    @inject('WriteUserPermissionRepository')
    private readonly writeUserPermissionRepository: IUserPermissionsRepository
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