import { TransactionReversalRequestDTO } from "@Applications/DTOs/Requests/Transactions/TransactionReversalRequestDTO";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { TransactionsErrorsMessages } from "@Domain/Exceptions/Errors/Transactions/TransactionsErrorsMessages";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { ITransactionsRepository } from "@Domain/Interfaces/Repositories/Transactions/ITransactionsRepository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateTransactionsReversalUseCase {
  constructor(
    @inject('TransactionsRepository')
    private readonly transactionsRepository : ITransactionsRepository,
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository,
  ){}

  async execute({code, reason}: TransactionReversalRequestDTO) : Promise<void> {
    const transaction = await this.transactionsRepository.findTransactionByCode(code);
    if(!transaction)
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.invalidCode), 404);
  }
}