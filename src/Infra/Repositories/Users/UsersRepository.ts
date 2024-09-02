import { IReadUserRepository } from "@Domain/Interfaces/Repositories/Users/IReadUserRepository";
import { IWriteUserRepository } from "@Domain/Interfaces/Repositories/Users/IWriteUserRepository";
import { prisma } from "@Infra/Data/database";
import { Users } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class UsersRepository implements IWriteUserRepository, IReadUserRepository {
  private repository = prisma.users;


  async create(user: Users): Promise<Users> {
    const context = await this.repository.create({
      data: user
    })
    return context;
  }
  
  async checkEmailAlreadyExist(email: string): Promise<boolean> {
    const user = await this.repository.count({ where: {email} });
    return user !== 0 ? true : false
  }

  async setUserTrue(id: string): Promise<void> {
    await this.repository.update({
      data: {isActive : true},
      where: { id}
    });
  }
}
  