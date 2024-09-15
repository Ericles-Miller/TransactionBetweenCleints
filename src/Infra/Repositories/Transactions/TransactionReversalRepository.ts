import { ITransactionReversalRepository } from '@Domain/Interfaces/Repositories/Transactions/ITransactionReversalRepository';
import { prisma } from '@Infra/DataBase/database';
import { TransactionsReversals } from '@prisma/client';
import { injectable } from 'inversify';


@injectable()
export class TransactionReversalRepository implements ITransactionReversalRepository {
  private readonly repository = prisma.transactionsReversals;

  async create(transactionReverse: TransactionsReversals): Promise<TransactionsReversals> {
    return await this.repository.create({data: transactionReverse});
  }

  async readByTransactionId(transactionId: string): Promise<TransactionsReversals | null> {
    return await this.repository.findFirst({where: {transactionId}});
  }

}