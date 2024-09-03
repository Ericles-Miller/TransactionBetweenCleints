import { UserWithPermissions } from "@Infra/Data/database";
import { Users } from "@prisma/client";

export interface IWriteUserRepository {
  create(user: Users): Promise<Users>;
  setUserTrue(id: string): Promise<void>;
  getByEmail(email: string): Promise<UserWithPermissions| null>;

}