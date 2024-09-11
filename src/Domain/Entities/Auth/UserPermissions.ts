import { Permission } from "./Permissions";
import { BaseEntity } from "../shared/Base";
import { User } from "./User";

export class UserPermissions extends BaseEntity {
  userId!: string;
  permissionId!: string;

  readonly user!: User;
  readonly permission!: Permission;

  constructor(userId: string, permissionId: string, id: string | null) {
    super(id)
    this.setUserId(userId)
    this.setPermissionId(permissionId)
  }

  setUserId(userId: string) : void {
    //validate se e um uuid
    this.userId = userId;
  }

  setPermissionId(permissionId: string) : void {
    // validate by repository
    // crio uma classe que le esse id em uma const
    this.permissionId = permissionId;
  }


  getUserEmail(): string {
    return this.user ? this.user.email : '';
  }

  getPermissionDescription(): string {
    return this.permission ? this.permission.getDescription() : '';
  }
}