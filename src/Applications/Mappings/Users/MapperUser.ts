import { User } from "@Domain/Entities/Auth/User";
import { UserPermissions } from "@Domain/Entities/Auth/UserPermissions";
import { UserWithPermissions } from "@Domain/Types/DataTypes/UserWithPermissions";
import { Users } from "@prisma/client";

export class MapperUser {
  mapperPrismaToUser(user: Users) : User {
    const mapperUser = new User(user.name, user.email, user.balance, user.id);

    mapperUser.createdAt = user.createdAt;
    mapperUser.updatedAt = user.updatedAt;
    mapperUser.isActive = user.isActive;
    mapperUser.password = user.password;
    mapperUser.refreshTokenCode = user.refreshTokenCode ? user.refreshTokenCode : undefined;
    mapperUser.lastLogin = user.lastLogin;

    return mapperUser;
  }

  mapperUserPermissionsToUser(user: UserWithPermissions): User {
    const mapperUser = new User(user.name, user.email, user.balance, user.id);

    mapperUser.createdAt = user.createdAt;
    mapperUser.updatedAt = user.updatedAt;
    mapperUser.isActive = user.isActive;
    mapperUser.password = user.password;
    mapperUser.refreshTokenCode = user.refreshTokenCode || undefined;
    mapperUser.lastLogin = user.lastLogin;

    mapperUser.userPermissions = user.userPermissions
  ? user.userPermissions.map(perm => new UserPermissions(
      perm.id,
      perm.permissionId,
      perm.userId,
    ))
  : undefined;

    return mapperUser;
}


}