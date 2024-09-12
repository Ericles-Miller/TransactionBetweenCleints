import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { EStatusTransactions } from "@Domain/Enums/Transactions/EStatusTransactions";
import { TransactionsErrorsMessages } from "@Domain/Exceptions/Errors/Transactions/TransactionsErrorsMessages";
import { AppError } from "@Domain/Exceptions/Shared/AppError";


export class TransactionValidator { 
  validateAmount(amount: number) : void {
    if(amount <= 0 || amount === undefined) 
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.invalidAmount), 400);
  }

  validateStatus(status: string) : void {
    if(!Object.values(EStatusTransactions).includes(status as EStatusTransactions))
      throw new AppError(new ResponseDTO<string>(TransactionsErrorsMessages.invalidStatus), 400);
  }
}