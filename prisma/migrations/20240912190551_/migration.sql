/*
  Warnings:

  - Made the column `code` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "code" SET NOT NULL;
