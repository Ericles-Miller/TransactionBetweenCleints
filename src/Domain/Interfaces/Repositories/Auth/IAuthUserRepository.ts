import { User } from '@Domain/Entities/Auth/User';
import { Users } from '@prisma/client';

export interface IAuthUserRepository {
  authGetByEmail(email: string) : Promise<Users | null>;
  updateUserRefreshToken(user: User) : Promise<void>
}