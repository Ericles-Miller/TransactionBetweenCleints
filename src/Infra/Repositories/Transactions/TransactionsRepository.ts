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
  getByIds(senderId: string, receivedId: string): Promise<Transactions | null> {
    throw new Error("Method not implemented.");
  }
  async updateStatus(id: string, transaction: Transactions): Promise<Transactions> {
    return await this.repository.update({where: {id}, data: transaction });
  }

}