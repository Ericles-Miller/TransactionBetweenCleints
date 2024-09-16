import { UserWithPermissions } from '@Domain/Types/DataTypes/UserWithPermissions';
import { Users } from '@prisma/client';

export interface IUserRepository {
  create(user: Users): Promise<Users>;
  delete(id:string): Promise<void>;
  getByEmail(email: string): Promise<UserWithPermissions| null>;
  checkEmailAlreadyExist(email: string) : Promise<boolean>;
  findNameByEmail(email: string) : Promise<string|null>;
  readAll(): Promise<Users[]>;
  getById(id: string): Promise<Users| null>;
  getByIdWithPermissions(id: string): Promise<UserWithPermissions| null>;
  updateBalance(id: string, balance: number): Promise<void>;
  checkIdExists(id:string):Promise<boolean>;
  getNameById(id: string): Promise<string>;
  updateUpdateAt(id: string, updatedAt: null|Date) :Promise<Users>;
  checkEmailAlreadyExist(email: string) : Promise<boolean>;
  findNameByEmail(email: string) : Promise<string|null>;
  readAll(): Promise<Users[]>;
  getById(id: string): Promise<Users| null>;
  updateIsActive(id: string, isActive: boolean) : Promise<void>;
  invalidToken(id: string): Promise<void>;
  update(user: Users) : Promise<void>; 

}