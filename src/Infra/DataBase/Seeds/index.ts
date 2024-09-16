import 'reflect-metadata';
import { prisma } from '../database';
import { SeedsPermissions } from './SeedsPermissions';
import LoggerComponent from '@Infra/Logging/LoggerComponent';

async function main() {
  const logger = new LoggerComponent(main.name);
  try {
    logger.info('Connecting to database...');
    
    const seeds = new SeedsPermissions();
    await seeds.createPermissions();
    
    logger.info('Permissions created');
  } catch (error) {
    logger.error('Error creating permissions:', error);
  } finally {
    logger.info("Database disconnect successfully");
    await prisma.$disconnect();
  }
}

main()
