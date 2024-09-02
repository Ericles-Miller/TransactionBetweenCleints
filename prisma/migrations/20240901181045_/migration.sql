/*
  Warnings:

  - You are about to drop the column `updateAt` on the `usersPermissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usersPermissions" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
