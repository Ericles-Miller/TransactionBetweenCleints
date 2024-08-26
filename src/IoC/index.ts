import { BaseRepository } from '@Infra/Repositories/shared/BaseRepository';
import { Container } from 'inversify';

import { IUsersRepository } from '@Domain/Interfaces/Repositories/IUsersRepository';
import { prisma } from '@Infra/Data/database';
import { Permissions, PrismaClient, Users } from '@prisma/client';
import { CreateUserUseCase } from '@Applications/UseCase/Auth/CreateUserUseCase';
import { IPermissionsRepository } from '@Domain/Interfaces/Repositories/IPermissionsRepository';
import { UsersRepository } from '@Domain/Interfaces/Repositories/UsersRepository';
import { PermissionRepository } from '@Domain/Interfaces/Repositories/PermissionRepository';

export const container = new Container();

/// prisma
container.bind<PrismaClient>('PrismaClient').toConstantValue(prisma);


container.bind<BaseRepository<Users>>('UsersRepository').to(UsersRepository);
container.bind<BaseRepository<Permissions>>('PermissionRepository').to(PermissionRepository);
/// interfaces
container.bind<IUsersRepository>(UsersRepository).toSelf().inSingletonScope();
container.bind<IPermissionsRepository>(PermissionRepository).toSelf().inSingletonScope();

/// useCases
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
