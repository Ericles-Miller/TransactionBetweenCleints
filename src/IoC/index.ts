import { Container } from 'inversify';

import { UsersRepository } from '@Infra/Repositories/Auth/UsersRepository';
import { IPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/IPermissionsRepository';
import { PermissionRepository } from '@Infra/Repositories/Auth/PermissionRepository';

import { AddPermissions } from '@Applications/UseCases/Shared/AddPermissions';
import { IUserPermissionsRepository } from '@Domain/Interfaces/Repositories/Auth/IUserPermissionsRepository';
import { UserPermissionsRepository } from '@Infra/Repositories/Auth/UserPermissionRepository';
import { CreateAccessTokensUseCase } from '@Applications/UseCases/Auth/CreateAccessToken/CreateAccessTokensUseCase';
import { CredentialsToken } from '@Applications/UseCases/Shared/CredentialsToken';
import { AuthUserRepository } from '@Infra/Repositories/Auth/AuthUserRepository';
import { IAuthUserRepository } from '@Domain/Interfaces/Repositories/Auth/IAuthUserRepository';
import { CreateUserUseCase } from '@Applications/UseCases/Auth/Users/CreateUserUseCase';
import { LoginUserUseCase } from '@Applications/UseCases/Auth/CreateAccessToken/LoginUserUseCase';
import { UpdateUserTokenUseCase } from '@Applications/UseCases/Auth/Users/UpdateUserTokenUseCase';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';

export const container = new Container();

/// interfaces
container.bind<IUserRepository>('UsersRepository').to(UsersRepository).inSingletonScope();

container.bind<AddPermissions>(AddPermissions).toSelf();

// repositories
container.bind<IPermissionRepository>('PermissionRepository').to(PermissionRepository).inSingletonScope();
container.bind<IUserPermissionsRepository>('UserPermissionsRepository').to(UserPermissionsRepository);
container.bind<IAuthUserRepository>('AuthUserRepository').to(AuthUserRepository);


/// useCases
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
container.bind<LoginUserUseCase>(LoginUserUseCase).toSelf();
container.bind<CreateAccessTokensUseCase>(CreateAccessTokensUseCase).toSelf();
container.bind<CredentialsToken>(CredentialsToken).toSelf();
container.bind<UpdateUserTokenUseCase>(UpdateUserTokenUseCase).toSelf();
