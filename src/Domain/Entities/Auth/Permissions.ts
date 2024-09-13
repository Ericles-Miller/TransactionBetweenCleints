import { BaseEntity } from '../Shared/Base';
import { UserPermissions } from './UserPermissions';

export class Permission extends BaseEntity {
  description!: string;
  userPermissions?: UserPermissions[];

  constructor(description: string, id: string | null) {
    super(id)
    this.setDescription(description);
  }

  setDescription(description: string) : void {
    this.description = description;
  }

  getDescription() : string {
    return this.description.replace('Company.', '').replace('Client', '');
  }
}
