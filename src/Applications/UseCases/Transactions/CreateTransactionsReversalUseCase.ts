import { TransactionReversalRequestDTO } from '@Applications/DTOs/Requests/Transactions/TransactionReversalRequestDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { MapperTransactions } from '@Applications/Mappings/Transactions/MapperTransactions';
import { TransactionReversal } from '@Domain/Entities/Transactions/TransactionReversal';
import { UserErrorMessages } from '@Domain/Exceptions/Errors/Auth/UserErrorMessages';
import { TransactionsErrorsMessages } from '@Domain/Exceptions/Errors/Transactions/TransactionsErrorsMessages';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { IUserRepository } from '@Domain/Interfaces/Repositories/Auth/IUserRepository';
import { ITransactionReversalRepository } from '@Domain/Interfaces/Repositories/Transactions/ITransactionReversalRepository';
import { ITransactionsRepository } from '@Domain/Interfaces/Repositories/Transactions/ITransactionsRepository';
import { Transactions, TransactionsReversals, Users } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { UpdateBalanceUserUseCase } from '../Auth/Users/UpdateBalanceUserUseCase';
import { AccessTokenErrorMessages } from '@Domain/Exceptions/Errors/Auth/AccessTokenErrorMessages';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import { LoggerConstants } from '@Domain/Constants/LoggerConstants';
import { databaseResponseTimeHistogram } from '@Infra/Metrics/metrics';

@injectable()
export class CreateTransactionsReversalUseCase {
  private readonly logger = new LoggerComponent(CreateTransactionsReversalUseCase.name);

  constructor(
    @inject('TransactionsRepository')
    private readonly transactionsRepository : ITransactionsRepository,
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository,

    @inject(MapperTransactions)
    private mapperTransactions: MapperTransactions,

    @inject('TransactionReversalRepository')
    private readonly transactionReversalRepository : ITransactionReversalRepository,

    @inject(UpdateBalanceUserUseCase)
    private updateBalanceUserUseCase: UpdateBalanceUserUseCase,
  ){}

  async execute({code, reason, sub}: TransactionReversalRequestDTO) : Promise<ResponseDTO<TransactionsReversals>> {
    const metricsLabels = { operation: 'TransactionReversal' };
    const timer = databaseResponseTimeHistogram.startTimer();
    
    this.logger.info(LoggerConstants.transactionReversal);

    if(!sub) 
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);

    const transaction = await this.transactionsRepository.findTransactionByCode(code);
    if(!transaction)
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.invalidCode), 404);

    if(sub !== transaction.senderId)
      throw new AppError(new ResponseDTO<string>(AccessTokenErrorMessages.AccessDenied), 401);
    
    const sender = await this.validateReversalTransaction(transaction);

    const transactionsReversal = new TransactionReversal(null, transaction.id, reason);
    const mapperTransactionReversal = this.mapperTransactions.transactionReversalToPrisma(transactionsReversal);

    const error = await this.updateBalanceUserUseCase.execute({
      receivedId: transaction.senderId, amount: transaction.amount, sender,
    });

    if(error) {
      this.logger.warn(TransactionsErrorsMessages.transactInverseFailed);
      timer({ ...metricsLabels, success: 'false' });
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.transactInverseFailed), 400);
    }

    transaction.status = 'REVERSED';
    transaction.updatedAt = new Date();
    await this.transactionsRepository.updateStatus(transaction.id, transaction);
    
    const response = await this.transactionReversalRepository.create(mapperTransactionReversal);
    timer({ ...metricsLabels, success: 'true' });
    return new ResponseDTO<TransactionsReversals>(response);
  }

  private async validateReversalTransaction(transaction: Transactions) : Promise<Users> {
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
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.inverseTransaction), 400);

    return received;
  }
}