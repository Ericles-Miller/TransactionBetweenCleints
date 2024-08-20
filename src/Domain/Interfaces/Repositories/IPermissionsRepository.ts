import { Permissions } from "@prisma/client";
import { IBaseRepository } from "./shared/IBaseRepository";


export interface IPermissionsRepository extends IBaseRepository<Permissions> {
  listAllPermission(): Promise<Permissions[]>
}