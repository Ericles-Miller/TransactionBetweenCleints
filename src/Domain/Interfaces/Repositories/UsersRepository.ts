import { BaseRepository } from "@Infra/Repositories/shared/BaseRepository";
import { IUsersRepository } from "./IUsersRepository";
import { PrismaClient, Users } from "@prisma/client";
import { inject } from "inversify";


export class UsersRepository extends BaseRepository<Users> implements IUsersRepository {
  constructor(
    @inject('PrismaClient')
    private prisma : PrismaClient
  ) { super(prisma.users) }

  async checkEmailAlreadyExist(email: string): Promise<boolean> {
    const count = await this.prisma.users.count({
      where: {
        email: email,
      },
    });
    return count > 0;
  }
  
  setUserTrue(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
  