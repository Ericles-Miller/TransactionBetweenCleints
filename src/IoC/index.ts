import { Container } from 'inversify';

import { IWriteUserRepository } from '@Domain/Interfaces/Repositories/Users/IWriteUserRepository';
import { UsersRepository } from '@Infra/Repositories/Users/UsersRepository';
import { IReadUserRepository } from '@Domain/Interfaces/Repositories/Users/IReadUserRepository';
import { IReadPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/Permissions/IReadPermissionsRepository';
import { PermissionRepository } from '@Infra/Repositories/PermissionRepository';

import { AddPermissions } from '@Applications/UseCases/Shared/AddPermissions';
import { IWriteUserPermissionsRepository } from '@Domain/Interfaces/Repositories/Auth/UserPermissions/IWriteUserPermissionsRepository';
import { UserPermissionRepository } from '@Infra/Repositories/UserPermission/UserPermissionRepository';
import { CreateAccessTokensUseCase } from '@Applications/UseCases/Auth/CreateAccessToken/CreateAccessTokensUseCase';
import { CredentialsToken } from '@Applications/UseCases/Shared/CredentialsToken';
import { AuthUserRepository } from '@Infra/Repositories/Auth/AuthUserRepository';
import { IAuthUserRepository } from '@Domain/Interfaces/Repositories/Auth/IAuthUserRepository';
import { CreateUserUseCase } from '@Applications/UseCases/Auth/Users/CreateUserUseCase';
import { LoginUserUseCase } from '@Applications/UseCases/Auth/CreateAccessToken/LoginUserUseCase';
import { UpdateUserTokenUseCase } from '@Applications/UseCases/Auth/Users/UpdateUserTokenUseCase';

export const container = new Container();

/// interfaces
container.bind<IWriteUserRepository>('WriteUserRepository').to(UsersRepository).inSingletonScope();
container.bind<IReadUserRepository>('ReadUserRepository').to(UsersRepository).inSingletonScope();

container.bind<AddPermissions>(AddPermissions).toSelf();

// repositories
container.bind<IReadPermissionRepository>('ReadPermissionRepository').to(PermissionRepository).inSingletonScope();
container.bind<IWriteUserPermissionsRepository>('WriteUserPermissionRepository').to(UserPermissionRepository);
container.bind<IAuthUserRepository>('AuthUserRepository').to(AuthUserRepository);


/// useCases
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
container.bind<LoginUserUseCase>(LoginUserUseCase).toSelf();
container.bind<CreateAccessTokensUseCase>(CreateAccessTokensUseCase).toSelf();
container.bind<CredentialsToken>(CredentialsToken).toSelf();
container.bind<UpdateUserTokenUseCase>(UpdateUserTokenUseCase).toSelf();
