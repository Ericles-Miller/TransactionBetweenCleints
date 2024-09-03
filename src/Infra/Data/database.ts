import { PrismaClient, Users, UsersPermissions } from '@prisma/client';

export const prisma = new PrismaClient();

export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export type UserWithPermissions = Users & { UsersPermissions: UsersPermissions[] };

