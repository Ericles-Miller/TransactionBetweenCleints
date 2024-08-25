import { BaseRepository } from '@Infra/Repositories/shared/BaseRepository';
import { Container } from 'inversify';

import { IUsersRepository } from '@Domain/Interfaces/Repositories/IUsersRepository';
import { prisma } from '@Infra/Data/database';
import { UsersRepository } from '@Infra/Repositories/UsersRepository';
import { PrismaClient, Users } from '@prisma/client';
import { CreateUserUseCase } from '@Applications/UseCase/Auth/CreateUserUseCase';

export const container = new Container();

/// prisma
container.bind<PrismaClient>('PrismaClient').toConstantValue(prisma);
container.bind<BaseRepository<Users>>('UsersRepository').to(UsersRepository);

/// interfaces
container.bind<IUsersRepository>(UsersRepository).toSelf().inSingletonScope();


/// useCases
container.bind<CreateUserUseCase>(CreateUserUseCase).toSelf();
