/*
  Warnings:

  - You are about to drop the column `name` on the `permissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[description]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "permissions_name_key";

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "permissions_description_key" ON "permissions"("description");
