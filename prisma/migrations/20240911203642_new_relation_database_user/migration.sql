/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdBy",
DROP COLUMN "updatedBy",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ALTER COLUMN "isActive" SET DEFAULT true;
