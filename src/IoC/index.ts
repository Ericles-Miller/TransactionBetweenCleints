import { Container } from 'inversify';

import { CreateUserUseCase } from '@Applications/UseCases/Auth/CreateUserUseCase';
import { IWriteUserRepository } from '@Domain/Interfaces/Repositories/Users/IWriteUserRepository';
import { UsersRepository } from '@Infra/Repositories/Users/UsersRepository';
import { IReadUserRepository } from '@Domain/Interfaces/Repositories/Users/IReadUserRepository';
import { IReadPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/Permissions/IReadPermissionsRepository';
import { PermissionRepository } from '@Infra/Repositories/PermissionRepository';

import { AddPermissions } from '@Applications/UseCases/Shared/AddPermissions';
import { IWriteUserPermissionsRepository } from '@Domain/Interfaces/Repositories/Auth/UserPermissions/IWriteUserPermissionsRepository';
import { UserPermissionRepository } from '@Infra/Repositories/UserPermission/UserPermissionRepository';
import { LoginUserUseCase } from '@Applications/UseCases/Auth/LoginUserUseCase';

export const container = new Container();

// container.bind<PrismaClient>('PrismaClient').toConstantValue(prisma);

/// interfaces
container.bind<IWriteUserRepository>('WriteUserRepository').to(UsersRepository).inSingletonScope();
container.bind<IReadUserRepository>('ReadUserRepository').to(UsersRepository).inSingletonScope();

container.bind<AddPermissions>(AddPermissions).toSelf();

container.bind<IReadPermissionRepository>('ReadPermissionRepository').to(PermissionRepository).inSingletonScope();
container.bind<IWriteUserPermissionsRepository>('WriteUserPermissionRepository').to(UserPermissionRepository);

/// useCases
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
container.bind<LoginUserUseCase>(LoginUserUseCase).toSelf();