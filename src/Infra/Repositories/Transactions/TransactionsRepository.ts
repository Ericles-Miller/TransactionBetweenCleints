import { ITransactionsRepository } from "@Domain/Interfaces/Repositories/Transactions/ITransactionsRepository";
import { prisma } from "@Infra/DataBase/database";
import { Transactions } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class TransactionsRepository implements ITransactionsRepository {
  private readonly repository = prisma.transactions;

  async created(transaction: Transactions): Promise<Transactions> {
    return await this.repository.create({data: transaction});
  }
  async updateStatus(id: string, transaction: Transactions): Promise<Transactions> {
    return await this.repository.update({where: {id}, data: transaction });
  }

  async findTransactionByCode(code: string): Promise<Transactions | null> {
    return await this.repository.findFirst({where: { code }});
  }
}