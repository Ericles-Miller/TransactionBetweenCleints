import { Transactions } from "@prisma/client";


export interface ITransactionsRepository { 
  created(transaction: Transactions) :Promise<Transactions>;
  updateStatus(id: string, transaction: Transactions): Promise<Transactions>;
  findTransactionByCode(code: string) : Promise<Transactions | null>;
}