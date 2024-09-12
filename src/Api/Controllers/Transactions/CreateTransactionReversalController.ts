import { CreateTransactionsReversalUseCase } from "@Applications/UseCases/Transactions/CreateTransactionsReversalUseCase";
import { GenericConstants } from "@Domain/Constants/Shared/GenericConstants";
import { Request, Response } from "express";
import { container } from "IoC";


export class CreateTransactionReversalController {
  async handle(request: Request, response: Response) :Promise<Response> {
    const {code, reason} = request.body;

    const createTransactionsReversalUseCase = container.get(CreateTransactionsReversalUseCase);

    const responseData = await createTransactionsReversalUseCase.execute({code, reason});

    const uri = `${GenericConstants.baseUrl}/transactions/${responseData.data?.id}/reversal`;

    return response.status(201).location(uri).json(responseData);
  }
}