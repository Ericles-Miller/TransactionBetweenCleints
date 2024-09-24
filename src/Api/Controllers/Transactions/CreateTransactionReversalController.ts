import { CreateTransactionsReversalUseCase } from '@Applications/UseCases/Transactions/CreateTransactionsReversalUseCase';
import { GenericConstants } from '@Domain/Constants/Shared/GenericConstants';
import { Request, Response } from 'express';
import { container } from '@IoC/index';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { TransactionsReversals } from '@prisma/client';


export class CreateTransactionReversalController {
  async handle(request: Request, response: Response) :Promise<Response> {
    const {code, reason} = request.body;
    const sub = request.user?.sub;

    const createTransactionsReversalUseCase = container.get(CreateTransactionsReversalUseCase);

    const responseData = await createTransactionsReversalUseCase.execute({code, reason, sub});

    const uri = `${GenericConstants.baseUrl}/transactions/${responseData.id}/reversal`;

    return response.status(201).location(uri).json( new ResponseDTO<TransactionsReversals>(responseData));
  }
}