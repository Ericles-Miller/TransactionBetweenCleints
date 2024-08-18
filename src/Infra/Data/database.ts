import { Permissions, PrismaClient, Users, UsersPermissions } from '@prisma/client';

export const { users, permissions, usersPermissions } = new PrismaClient();
export const prisma = new PrismaClient();

export type RepositoryType<T> = T extends Users
  ? PrismaClient['users']
  : T extends Permissions
  ? PrismaClient['permissions']
  : T extends UsersPermissions
  ? PrismaClient['usersPermissions']
  :never;


export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}
