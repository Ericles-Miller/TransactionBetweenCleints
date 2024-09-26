import { TransactionsReversals } from '@prisma/client';

export interface ITransactionReversalRepository {
  create(transactionReverse: TransactionsReversals) : Promise<TransactionsReversals>
  readByTransactionId(transactionId: string) : Promise<TransactionsReversals|null>
}