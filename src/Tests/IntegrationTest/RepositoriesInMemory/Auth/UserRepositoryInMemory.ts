import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { UserWithPermissions } from "@Domain/Types/DataTypes/UserWithPermissions";
import { Users } from "@prisma/client";


export class UserRepositoryInMemory implements IUserRepository {
  private readonly users: Users[] = [];
  
  async create(user: Users): Promise<Users> {
    this.users.push(user);
    return user;
  }
  
  getByEmail(email: string): Promise<UserWithPermissions | null> {
    throw new Error("Method not implemented.");
  }
  updateBalance(id: string, balance: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  checkIdExists(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getNameById(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async updateUpdateAt(id: string, updatedAt: null | Date): Promise<Users> {
    const user = this.users.find(user => user.id === id);
      user!.updatedAt = updatedAt || new Date(); 
      return user;
  }
  
  async checkEmailAlreadyExist(email: string): Promise<boolean> {
    return this.users.find((user) => user.email === email) ? true : false
  }
  findNameByEmail(email: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  readAll(): Promise<Users[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Users | null> {
    throw new Error("Method not implemented.");
  }
  updateIsActive(id: string, isActive: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}