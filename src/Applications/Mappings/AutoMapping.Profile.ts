import { User } from "@Domain/Entities/User";
import { UsersPermission } from "@Domain/Entities/UsersPermission";
import { IMapper } from "@Domain/Interfaces/Repositories/Shared/IMapper";
import { UserWithPermissions } from "@Infra/Data/database";

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
    // Mapear o usuário usando o PrismaMapper
    const userMapper = new PrismaMapper<UserWithPermissions, User>();
    const user: User = userMapper.map(userWithPermissions);
  
    // Mapear manualmente as permissões, se necessário

    // preciso verificar como usar a propriedade user mapping tanto para criar tanto para login

    user.usersPermissions = userWithPermissions.UsersPermissions.map(up => {
      return new UsersPermission(
        up.permissionId,
        up.userId,
      );
    });
  
    return user;
  }
}
