import { BaseRepository } from "@Infra/Repositories/shared/BaseRepository";
import { IPermissionsRepository } from "./IPermissionsRepository";
import { inject } from "inversify";
import { Permissions, PrismaClient } from "@prisma/client";


export class PermissionRepository extends BaseRepository<Permissions> implements IPermissionsRepository {
  constructor(
    @inject('PrismaCLient')
    private prisma: PrismaClient
  ){ 
    super(prisma.permissions)
  }


  listAllPermission(): Promise<Permissions[]> {
    throw new Error("Method not implemented.");
  }
}