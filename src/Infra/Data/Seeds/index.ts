import { prisma } from "@Infra/Data/database";
import { SeedsPermissions } from "./SeedsPermissions";

async function main() {
  const seeds = new SeedsPermissions();

  await seeds.createPermissions();
  prisma.$disconnect();
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
})
