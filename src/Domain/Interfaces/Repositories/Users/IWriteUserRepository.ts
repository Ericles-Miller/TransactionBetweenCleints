import { Users } from "@prisma/client";

export interface IWriteUserRepository {
  create(user: Users): Promise<Users>
  setUserTrue(id: string): Promise<void>

}