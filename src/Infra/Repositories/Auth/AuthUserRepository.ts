import { User } from "@Domain/Entities/User";
import { IAuthUserRepository } from "@Domain/Interfaces/Repositories/Auth/IAuthUserRepository";
import { prisma } from "@Infra/Data/database";
import { Users } from "@prisma/client";
import { injectable } from "inversify";


@injectable()
export class AuthUserRepository implements IAuthUserRepository {
  private readonly repository = prisma.users;
  async authGetByEmail(email: string): Promise<Users | null> {
    const user = await this.repository.findFirst({
      where: { email }
    });
    return user
  }

  async updateUser(user: User) : Promise<void> {
    await this.repository.update({
      data: user,
      where: {id: user.id}
    })
  }
}