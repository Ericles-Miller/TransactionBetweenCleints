import { UserWithPermissions } from "@Domain/Types/DataTypes/UserWithPermissions";
import { Users } from "@prisma/client";

export interface IUserRepository {
  create(user: Users): Promise<Users>;
  getByEmail(email: string): Promise<UserWithPermissions| null>;
  checkEmailAlreadyExist(email: string) : Promise<boolean>
  findNameByEmail(email: string) : Promise<string|null>
  readAll(): Promise<Users[]>
  getById(id: string): Promise<Users| null>
  updateIsActive(id: string, isActive: boolean) : Promise<void>

}