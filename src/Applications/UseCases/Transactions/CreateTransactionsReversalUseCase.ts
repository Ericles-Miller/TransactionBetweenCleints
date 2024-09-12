import { TransactionReversalRequestDTO } from "@Applications/DTOs/Requests/Transactions/TransactionReversalRequestDTO";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { MapperTransactions } from "@Applications/Mappings/Transactions/MapperTransactions";
import { TransactionReversal } from "@Domain/Entities/Transactions/TransactionReversal";
import { UserErrorMessages } from "@Domain/Exceptions/Errors/Auth/UserErrorMessages";
import { TransactionsErrorsMessages } from "@Domain/Exceptions/Errors/Transactions/TransactionsErrorsMessages";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { ITransactionReversalRepository } from "@Domain/Interfaces/Repositories/Transactions/ITransactionReversalRepository";
import { ITransactionsRepository } from "@Domain/Interfaces/Repositories/Transactions/ITransactionsRepository";
import { Transactions, TransactionsReversals } from "@prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class CreateTransactionsReversalUseCase {
  constructor(
    @inject('TransactionsRepository')
    private readonly transactionsRepository : ITransactionsRepository,
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository,

    @inject(MapperTransactions)
    private mapperTransactions: MapperTransactions,

    @inject('TransactionReversalRepository')
    private readonly transactionReversalRepository : ITransactionReversalRepository,
  ){}

  async execute({code, reason}: TransactionReversalRequestDTO) : Promise<ResponseDTO<TransactionsReversals>> {
    const transaction = await this.transactionsRepository.findTransactionByCode(code);
    if(!transaction)
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.invalidCode), 404);
    
    this.validateReversalTransaction(transaction);

    const transactionsReversal = new TransactionReversal(null, transaction.id, reason);
    const mapperTransactionReversal = this.mapperTransactions.transactionReversalToPrisma(transactionsReversal);

    const response = await this.transactionReversalRepository.create(mapperTransactionReversal);

    return new ResponseDTO<TransactionsReversals>(response);
  }

  private async validateReversalTransaction(transaction: Transactions) : Promise<void> {
    const received = await this.usersRepository.getById(transaction.receiverId);
    if(!received)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 400);

    if(!received.id)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.isInactive), 400);

    const sender = await this.usersRepository.getById(transaction.senderId);
    if(!sender)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 400);

    if(!sender.id)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.isInactive), 400);

    if(received.balance < transaction.amount)
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.insufficientBalance), 400);

    if(transaction.status === 'REVERSED')
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.InverseTransaction), 400);
  }
}