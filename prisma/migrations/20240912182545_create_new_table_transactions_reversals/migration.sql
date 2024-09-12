-- CreateTable
CREATE TABLE "TransactionsReversals" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "reason" VARCHAR(250),
    "reversedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionsReversals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionsReversals" ADD CONSTRAINT "TransactionsReversals_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
