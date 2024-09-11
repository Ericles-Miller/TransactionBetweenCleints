import { BaseEntity } from "./shared/Base";
import { UsersPermission } from "./UserPermissions";

export class Permission extends BaseEntity {
  description!: string;
  userPermissions?: UsersPermission[];

  constructor(description: string) {
    super()
    this.setDescription(description);
  }

  setDescription(description: string) : void {
    // validar a descricao
    this.description = description;
  }

  getDescription() : string {
    return this.description.replace('Company.', '').replace('Client', '');
  }
}
