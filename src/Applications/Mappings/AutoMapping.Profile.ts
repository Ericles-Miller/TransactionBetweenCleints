import { User } from '@Domain/Entities/Auth/User';
import { UserPermissions } from '@Domain/Entities/Auth/UserPermissions';
import { IMapper } from '@Domain/Interfaces/Shared/IMapper';
import { UserWithPermissions } from '@Domain/Types/DataTypes/UserWithPermissions';

export class PrismaMapper<TSource, TDestination> implements IMapper<TSource, TDestination> {
  constructor() {}

  map(source: TSource): TDestination {
    const destination: TDestination = {} as TDestination;
    this.mapProperties(source, destination);
    return destination;
  }

  private mapProperties(source: any, destination: any) {
    let currentSource = source;

    while (currentSource && currentSource !== Object.prototype) {
      Object.keys(currentSource).forEach((key) => {
        if (source[key] !== undefined) {
          destination[key] = source[key];
        }
      });

      currentSource = Object.getPrototypeOf(currentSource);
    }
  }

  mapUserWithPermissions(userWithPermissions: UserWithPermissions): User {
    const userMapper = new PrismaMapper<UserWithPermissions, User>();
    const user: User = userMapper.map(userWithPermissions);
  
    user.userPermissions = userWithPermissions.userPermissions?.map(up => {
      return new UserPermissions(
        up.userId,
        up.permissionId,
        null
      );
    });
  
    return user;
  }

   
}
