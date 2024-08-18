/*
  Warnings:

  - You are about to drop the column `updeatedAt` on the `permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "updeatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
