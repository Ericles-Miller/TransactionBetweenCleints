import { Transactions } from "@prisma/client";


export interface ITransactionsRepository { 
  created(transaction: Transactions) :Promise<Transactions> 
  getByIds(senderId: string, receivedId: string) : Promise<Transactions | null>
  updateStatus(id: string, transaction: Transactions): Promise<Transactions>
}