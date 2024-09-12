/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "transactions_id_senderId_receiverId_idx";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "code" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "transactions_code_key" ON "transactions"("code");

-- CreateIndex
CREATE INDEX "transactions_id_senderId_receiverId_code_idx" ON "transactions"("id", "senderId", "receiverId", "code");
