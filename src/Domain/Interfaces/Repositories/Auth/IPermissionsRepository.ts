import { ETypePermission } from '@Domain/Enums/Auth/ETypePermissions';
import { Permissions, UserPermissions } from '@prisma/client';

export interface IPermissionRepository {
  listAllPermission(): Promise<Permissions[]>
  readAllWithFilterReadOnly(type: ETypePermission): Promise<Permissions[]>;
  readAllIdsReadOnly( ids: string[]): Promise<string[]>;
  readDescriptionsByIdsReadOnly(ids: string[]): Promise<string[]>;
}