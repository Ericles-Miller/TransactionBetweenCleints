import { User } from "@Domain/Entities/Auth/User";
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

}