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
import { prisma } from '@Infra/DataBase/database';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';
import { LoggerConstants } from '@Domain/Constants/LoggerConstants';


@injectable()
export class CreateTransactionsUseCase {
  private readonly logger = new LoggerComponent(CreateTransactionsUseCase.name);

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
    try {
      this.logger.info(LoggerConstants.createTransaction);
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
  
      const transaction = await prisma.$transaction(async(prisma) => {
        const transaction = new Transaction(senderId, receivedId, amount, null);
        let prismaTransaction = this.mapperTransactions.mapperTransactionToPrisma(transaction);
        
        const newTransaction = await this.transactionsRepository.created(prismaTransaction);
        const error = await this.updateBalanceUserUseCase.execute({receivedId, amount, sender});
        if(error)
          throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.transactionError), 400);

        
        transaction.setStatus('COMPLETED');
        transaction.setUpdatedAt(); 
        
        prismaTransaction = this.mapperTransactions.mapperTransactionToPrisma(transaction);
        await this.transactionsRepository.updateStatus(newTransaction.id, prismaTransaction);
        
        return prismaTransaction; 
      });

      const response = await this.mapperTransactions.mapperTransactionResponse(transaction);
      return new ResponseDTO<TransactionResponseDTO>(response);
    } 
    catch (error) {
      if(error instanceof AppError) {
        this.logger.warn(GenericErrorMessages.invalidAction, error);
        throw error;
      }
      this.logger.error(TransactionsErrorsMessages.unexpectedCreateTransaction, error);
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.unexpectedCreateTransaction), 500);
    }
  }
}