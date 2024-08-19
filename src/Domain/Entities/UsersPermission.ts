import { Permission } from "./Permissions";
import { BaseEntity } from "./shared/Base";
import { User } from "./User";

export class UsersPermission extends BaseEntity {
  userId!: string;
  permissionId!: string;

  user!: User;
  permission?: Permission;

  getUserEmail(): string {
    return this.user ? this.user.email : '';
  }

  getPermissionDescription(): string {
    return this.permission ? this.permission.getDescription() : '';
  }
}