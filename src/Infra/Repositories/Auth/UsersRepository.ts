import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { UserWithPermissions } from "@Domain/Types/DataTypes/UserWithPermissions";
import { prisma } from "@Infra/DataBase/database";
import { Users } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class UsersRepository implements IUserRepository {
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

  async getByEmail(email: string): Promise<UserWithPermissions | null> {
    const user = await this.repository.findFirst({
      where: { email },
      include: {
        userPermissions: true
      }
    });

    return user as UserWithPermissions | null;
  }

  async findNameByEmail(email: string): Promise<string| null> {
    const name = await this.repository.findFirst({ 
      where: { email},
      select: {name : true}
    });

    if(name?.name)
      return name?.name;
    return null;
  }

  async readAll(): Promise<Users[]> {
    return await this.repository.findMany();
  }

  async getById(id: string): Promise<Users| null> {
    return await this.repository.findFirst({where: {id}});
  }

  async updateBalance(id: string, balance: number): Promise<void> {
    await this.repository.update({ where: {id}, data: { balance, updatedAt: new Date}  });
  }
  async checkIdExists(id: string): Promise<boolean> {
    const user = await this.repository.count({ where: {id} });
    return user !== 0 ? true : false
  }

  async getNameById(id: string): Promise<string> {
    const context = await this.repository.findFirst({
      where: {id},
      select: {name: true}
    })

    return context?.name ? context.name : '';
  }

  async updateUpdateAt(id: string, updatedAt: null|Date) :Promise<Users> {
    return await this.repository.update({where: {id}, data: {updatedAt}});
  }
}
  