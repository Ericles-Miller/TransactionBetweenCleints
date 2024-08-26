import { BaseRepository } from "@Infra/Repositories/shared/BaseRepository";
import { IPermissionsRepository } from "./IPermissionsRepository";
import { inject, injectable } from "inversify";
import { Permissions, PrismaClient } from "@prisma/client";

@injectable()
export class PermissionRepository extends BaseRepository<Permissions> implements IPermissionsRepository {
  constructor(
    @inject('PrismaClient')
    private readonly prisma: PrismaClient
  ){ 
    super(prisma.permissions)
  }


  listAllPermission(): Promise<Permissions[]> {
    throw new Error("Method not implemented.");
  }
}