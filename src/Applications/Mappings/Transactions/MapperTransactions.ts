import { TransactionResponseDTO } from '@Applications/DTOs/Responses/Transactions/TransactionResponseDTO';
import { Transaction } from '@Domain/Entities/Transactions/Transaction';
import { TransactionReversal } from '@Domain/Entities/Transactions/TransactionReversal';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { Transactions, TransactionsReversals } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
export class MapperTransactions {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  mapperTransactionToPrisma(transaction: Transaction): Transactions {
    const mapperTransaction: Transactions = {
     amount: transaction.amount,
     createdAt: transaction.createdAt,
     id:transaction.id,
     receiverId: transaction.receivedId,
     senderId: transaction.senderId,
     status: transaction.status,
     updatedAt: transaction.updatedAt,
     code: transaction.code,
    }
    
    return mapperTransaction;
  }

  async mapperTransactionResponse(transaction: Transactions): Promise<TransactionResponseDTO> {
    const mapperTransaction : TransactionResponseDTO = {
      id: transaction.id,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
      received: await this.usersRepository.getNameById(transaction.receiverId),
      sender: await this.usersRepository.getNameById(transaction.senderId),
      status: transaction.status,
      updatedAt: transaction.updatedAt,
      code: transaction.code,
    }

    return mapperTransaction;
  }

  transactionReversalToPrisma(transactionReverse: TransactionReversal) : TransactionsReversals {
    const mapperTransactionReversal : TransactionsReversals = {
      id: transactionReverse.id,
      reason: transactionReverse.reason,
      transactionId: transactionReverse.transactionId,
      reversedAt: new Date(),
    }

    return mapperTransactionReversal;
  }
}