import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { PermissionConstants } from '@Domain/Constants/Auth/PermissionsConstants';
import { Permission } from '@Domain/Entities/Auth/Permissions';


export class SeedsPermissions {
  private prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async createPermissions() : Promise<void> {
    const permissions : Permission[] = [];

    let permission = new Permission(PermissionConstants.clientAdmin, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.companyCommercial, null);
    permissions.push(permission);

    permissions.map(async (permission) => {     
      await this.prisma.permissions.create({
        data: {
          description : permission.description,
          createAt: permission.createdAt,
        },
      })
    })
  }
}
