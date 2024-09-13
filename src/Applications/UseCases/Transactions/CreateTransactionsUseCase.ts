import { TransactionRequestDTO } from '@Applications/DTOs/Requests/Transactions/TransactionRequestDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { Transaction } from '@Domain/Entities/Transactions/Transaction';
import { TransactionsErrorsMessages } from '@Domain/Exceptions/Errors/Transactions/TransactionsErrorsMessages';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { ITransactionsRepository } from '@Domain/Interfaces/Repositories/Transactions/ITransactionsRepository';
import { inject, injectable } from 'inversify';
import { UpdateBalanceUserUseCase } from '../Auth/Users/UpdateBalanceUserUseCase';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { TransactionResponseDTO } from '@Applications/DTOs/Responses/Transactions/TransactionResponseDTO';
import { MapperTransactions } from '@Applications/Mappings/Transactions/MapperTransactions';
import { AccessTokenErrorMessages } from '@Domain/Exceptions/Errors/Auth/AccessTokenErrorMessages';


@injectable()
export class CreateTransactionsUseCase {
  constructor(
    @inject('TransactionsRepository')
    private readonly transactionsRepository : ITransactionsRepository,
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository,

    @inject(UpdateBalanceUserUseCase)
    private updateBalanceUserUseCase: UpdateBalanceUserUseCase,

    @inject(MapperTransactions)
    private mapperTransactions: MapperTransactions,
  ) {}

  async execute({ amount, receivedId, senderId, sub }: TransactionRequestDTO) : Promise<ResponseDTO<TransactionResponseDTO>> {
    const sender = await this.usersRepository.getById(senderId);
    if(!sub) 
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);

    if(sub !== senderId)
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);

    if(!sender)
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.invalidSender), 404);

    if(!sender.isActive)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.userInactive), 404);

    if(receivedId === senderId)
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.sameUser), 400);

    if(amount > sender.balance)
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.insufficientBalance), 400)

    const transaction = new Transaction(senderId, receivedId, amount, null);
    let prismaTransaction = this.mapperTransactions.mapperTransactionToPrisma(transaction);

    const newTransaction = await this.transactionsRepository.created(prismaTransaction);
    const error = await this.updateBalanceUserUseCase.execute({receivedId, amount, sender});
    if(error) {
      transaction.setStatus('FAILED');
      transaction.setUpdatedAt();      
    } else {
      transaction.setStatus('COMPLETED');
      transaction.setUpdatedAt();
    } 

    prismaTransaction = this.mapperTransactions.mapperTransactionToPrisma(transaction);
    await this.transactionsRepository.updateStatus(newTransaction.id, prismaTransaction);
      
    const response = await this.mapperTransactions.mapperTransactionResponse(prismaTransaction);
    return new ResponseDTO<TransactionResponseDTO>(response);
  }
}