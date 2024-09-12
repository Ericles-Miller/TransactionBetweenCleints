import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { TransactionResponseDTO } from "@Applications/DTOs/Responses/Transactions/TransactionResponseDTO";
import { CreateTransactionsUseCase } from "@Applications/UseCases/Transactions/CreateTransactionsUseCase";
import { GenericConstants } from "@Domain/Constants/Shared/GenericConstants";
import { GenericEntityConstants } from "@Domain/Constants/Shared/GenericEntityConstant";
import { Request, Response } from "express";
import { container } from "IoC";


export class CreateTransactionController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { amount, receivedId, senderId } = request.body;

    const createTransactionUseCase = container.get(CreateTransactionsUseCase);

    const transaction = await createTransactionUseCase.execute({ amount, receivedId,senderId });

    const uri = `${GenericConstants.baseUrl}/transactions/${transaction.data?.id}`;

    return response.status(200).location(uri).json(transaction);
  }
}