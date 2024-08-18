/*
  Warnings:

  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "password" VARCHAR(50) NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL,
ADD COLUMN     "updeatedAt" TIMESTAMP(3),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updeatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersPermissions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permissionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "usersPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE INDEX "usersPermissions_id_userId_permissionId_idx" ON "usersPermissions"("id", "userId", "permissionId");

-- CreateIndex
CREATE INDEX "users_id_email_idx" ON "users"("id", "email");

-- AddForeignKey
ALTER TABLE "usersPermissions" ADD CONSTRAINT "usersPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersPermissions" ADD CONSTRAINT "usersPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
