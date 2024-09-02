import { UsersPermissions } from "@prisma/client";

export interface IWriteUserPermissionsRepository {
  create(permission: UsersPermissions): Promise<void>;
  companyCountAdminsAsync(): Promise<number>;
  delete(userId: string, permissionId: string): Promise<void>
}