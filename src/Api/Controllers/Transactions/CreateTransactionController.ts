import { CreateTransactionsUseCase } from '@Applications/UseCases/Transactions/CreateTransactionsUseCase';
import { GenericConstants } from '@Domain/Constants/Shared/GenericConstants';
import { Request, Response } from 'express';
import { container } from '@IoC/index';


export class CreateTransactionController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { amount, receivedId, senderId } = request.body;
    const sub = request.user?.sub;

    const createTransactionUseCase = container.get(CreateTransactionsUseCase);

    const transaction = await createTransactionUseCase.execute({ amount, receivedId,senderId, sub });

    const uri = `${GenericConstants.baseUrl}/transactions/${transaction.data?.id}`;

    return response.status(200).location(uri).json(transaction);
  }
}