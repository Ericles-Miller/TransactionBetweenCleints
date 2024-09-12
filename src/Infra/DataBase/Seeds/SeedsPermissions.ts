import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { PermissionConstants } from "@Domain/Constants/Auth/PermissionsConstants";
import { Permission } from "@Domain/Entities/Auth/Permissions";


export class SeedsPermissions {
  private prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async createPermissions() : Promise<void> {
    const permissions : Permission[] = [];

    let permission = new Permission(PermissionConstants.clientAdmin, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.clientFinancial, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.clientInstructor, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.clientMarketing, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.clientSupervisor, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.clientSupport, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.clientTechnician, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.clientUser, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.companyAdmin, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.companyCommercial, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.companyFinancial, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.companyMarketing, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.companySupport, null);
    permissions.push(permission);

    permission = new Permission(PermissionConstants.companyTechnician, null);
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
