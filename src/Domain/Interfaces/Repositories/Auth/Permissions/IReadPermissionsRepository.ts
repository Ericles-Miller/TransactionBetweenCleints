import { ETypePermission } from "@Domain/Enums/ETypePermissions";
import { Permissions } from "@prisma/client";

export interface IReadPermissionRepository {
  listAllPermission(): Promise<Permissions[]>
  readAllWithFilterReadOnly(type: ETypePermission): Promise<Permissions[]>;
  readAllIdsReadOnly( ids: string[]): Promise<string[]>;
  readDescriptionsByIdsReadOnly(ids: string[]): Promise<string[]>;
}