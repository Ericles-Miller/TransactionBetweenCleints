import "reflect-metadata";
import { prisma } from "../database";
import { SeedsPermissions } from "./SeedsPermissions";

async function main() {
  try {
    console.log('Connecting to database...');
    
    const seeds = new SeedsPermissions();
    await seeds.createPermissions();
    
    console.log('Permissions created');
  } catch (error) {
    console.error('Error creating permissions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
