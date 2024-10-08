import { User } from '@Domain/Entities/Auth/User';
import { IAuthUserRepository } from '@Domain/Interfaces/Repositories/Auth/IAuthUserRepository';
import { prisma } from '@Infra/DataBase/database';
import { Users } from '@prisma/client';
import { injectable } from 'inversify';


@injectable()
export class AuthUserRepository implements IAuthUserRepository {
  private readonly repository = prisma.users;
  async authGetByEmail(email: string): Promise<Users | null> {
    const user = await this.repository.findFirst({
      where: { email }
    });
    return user
  }

  async updateUserRefreshToken({ lastLogin, refreshTokenCode, updatedAt, id }: User) : Promise<void> {
    await this.repository.update({
      data: { lastLogin, refreshTokenCode, updatedAt },
      where: {id}
    })
  }
}