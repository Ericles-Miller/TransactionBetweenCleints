import { UsersPermissions } from "@prisma/client";

export interface IUserPermissionsRepository {
  create(permission: UsersPermissions): Promise<void>;
  companyCountAdminsAsync(): Promise<number>;
  delete(userId: string, permissionId: string): Promise<void>
}