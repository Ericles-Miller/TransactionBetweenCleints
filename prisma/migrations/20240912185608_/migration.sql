-- DropIndex
DROP INDEX "transactions_code_key";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "code" DROP NOT NULL,
ALTER COLUMN "code" DROP DEFAULT;
