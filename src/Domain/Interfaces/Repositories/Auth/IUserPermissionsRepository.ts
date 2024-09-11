import { UserPermissions } from "@prisma/client";

export interface IUserPermissionsRepository {
  create(usersPermission: UserPermissions[]): Promise<void>;
}