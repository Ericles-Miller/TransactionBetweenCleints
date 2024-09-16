import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export class DatabaseConnection {
  async checkConnection(): Promise<void> {
    const logger = new LoggerComponent(DatabaseConnection.name);
    try {
      await prisma.$connect();
      logger.info("Database connect successfully");
    } catch (error) {
      logger.error('Error connecting to the database:', error);
    } finally {
      logger.info("Database disconnect successfully");
      await prisma.$disconnect();
    }
  }
}


