import { Container } from 'inversify';

import { UsersRepository } from '@Infra/Repositories/Auth/UsersRepository';
import { IPermissionRepository } from '@Domain/Interfaces/Repositories/Auth/IPermissionsRepository';
import { PermissionRepository } from '@Infra/Repositories/Auth/PermissionRepository';

import { AddPermissions } from '@Applications/UseCases/Shared/AddPermissions';
import { IUserPermissionsRepository } from '@Domain/Interfaces/Repositories/Auth/IUserPermissionsRepository';
import { UserPermissionsRepository } from '@Infra/Repositories/Auth/UserPermissionRepository';
import { CredentialsToken } from '@Applications/UseCases/Shared/CredentialsToken';
import { AuthUserRepository } from '@Infra/Repositories/Auth/AuthUserRepository';
import { IAuthUserRepository } from '@Domain/Interfaces/Repositories/Auth/IAuthUserRepository';
import { CreateUserUseCase } from '@Applications/UseCases/Auth/Users/CreateUserUseCase';
import { UpdateUserTokenUseCase } from '@Applications/UseCases/Auth/AccessToken/UpdateUserTokenUseCase';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { ReadAllUsersUseCase } from '@Applications/UseCases/Auth/Users/ReadAllUsersUseCase';
import { ReadUserByIdUseCase } from '@Applications/UseCases/Auth/Users/ReadUserByIdUseCase';
import { CreateAccessTokensUseCase } from '@Applications/UseCases/Auth/AccessToken/CreateAccessToken/CreateAccessTokensUseCase';
import { LoginUserUseCase } from '@Applications/UseCases/Auth/AccessToken/CreateAccessToken/LoginUserUseCase';
import { UpdateIsActiveUseCase } from '@Applications/UseCases/Auth/Users/UpdateIsActiveUseCase';
import { ITransactionsRepository } from '@Domain/Interfaces/Repositories/Transactions/ITransactionsRepository';
import { TransactionsRepository } from '@Infra/Repositories/Transactions/TransactionsRepository';
import { MapperTransactions } from '@Applications/Mappings/Transactions/MapperTransactions';
import { CreateTransactionsUseCase } from '@Applications/UseCases/Transactions/CreateTransactionsUseCase';
import { UpdateBalanceUserUseCase } from '@Applications/UseCases/Auth/Users/UpdateBalanceUserUseCase';
import { CreateTransactionsReversalUseCase } from '@Applications/UseCases/Transactions/CreateTransactionsReversalUseCase';
import { TransactionReversalRepository } from '@Infra/Repositories/Transactions/TransactionReversalRepository';
import { ITransactionReversalRepository } from '@Domain/Interfaces/Repositories/Transactions/ITransactionReversalRepository';

export const container = new Container();

/// interfaces
container.bind<AddPermissions>(AddPermissions).toSelf();

// repositories
container.bind<ITransactionsRepository>('TransactionsRepository').to(TransactionsRepository).inSingletonScope();
container.bind<IUserRepository>('UsersRepository').to(UsersRepository).inSingletonScope();
container.bind<IPermissionRepository>('PermissionRepository').to(PermissionRepository).inSingletonScope();
container.bind<IUserPermissionsRepository>('UserPermissionsRepository').to(UserPermissionsRepository);
container.bind<IAuthUserRepository>('AuthUserRepository').to(AuthUserRepository);
container.bind<ITransactionReversalRepository>('TransactionReversalRepository').to(TransactionReversalRepository);

/// useCases
///users
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
container.bind<ReadAllUsersUseCase>(ReadAllUsersUseCase).toSelf();
container.bind<ReadUserByIdUseCase>(ReadUserByIdUseCase).toSelf();
container.bind<UpdateBalanceUserUseCase>(UpdateBalanceUserUseCase).toSelf();
container.bind<UpdateIsActiveUseCase>(UpdateIsActiveUseCase).toSelf();

//auth
container.bind<LoginUserUseCase>(LoginUserUseCase).toSelf();
container.bind<CreateAccessTokensUseCase>(CreateAccessTokensUseCase).toSelf();
container.bind<CredentialsToken>(CredentialsToken).toSelf();
container.bind<UpdateUserTokenUseCase>(UpdateUserTokenUseCase).toSelf();

/// transactions
container.bind<MapperTransactions>(MapperTransactions).toSelf();
container.bind<CreateTransactionsUseCase>(CreateTransactionsUseCase).toSelf();
container.bind<CreateTransactionsReversalUseCase>(CreateTransactionsReversalUseCase).toSelf();