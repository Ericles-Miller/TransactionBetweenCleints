import { User } from "@Domain/Entities/User";
import { UsersPermission } from "@Domain/Entities/UsersPermission";
import { IMapper } from "@Domain/Interfaces/Repositories/Shared/IMapper";
import { UserWithPermissions } from "@Domain/Types/DataTypes/UserWithPermissions";

export class PrismaMapper<TSource, TDestination> implements IMapper<TSource, TDestination> {
  constructor() {}

  map(source: TSource): TDestination {
    const destination: TDestination = {} as TDestination;
    this.mapProperties(source, destination);
    return destination;
  }

  private mapProperties(source: any, destination: any) {
    let currentSource = source;

    // Percorre a cadeia de protótipos para mapear todas as propriedades
    while (currentSource && currentSource !== Object.prototype) {
      Object.keys(currentSource).forEach((key) => {
        if (source[key] !== undefined) {
          destination[key] = source[key];
        }
      });

      // Passa para a próxima classe pai
      currentSource = Object.getPrototypeOf(currentSource);
    }
  }

  mapUserWithPermissions(userWithPermissions: UserWithPermissions): User {
    const userMapper = new PrismaMapper<UserWithPermissions, User>();
    const user: User = userMapper.map(userWithPermissions);
  
    user.usersPermissions = userWithPermissions.UsersPermissions.map(up => {
      return new UsersPermission(
        up.userId,
        up.permissionId,
      );
    });
  
    return user;
  }
}
