import { User } from "@Domain/Entities/User";
import { Users } from "@prisma/client";

export interface IAuthUserRepository {
  authGetByEmail(email: string) : Promise<Users | null>;
  updateUser(user: User) : Promise<void>
}