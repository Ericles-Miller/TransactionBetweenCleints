import { ReadUserByIdUseCase } from "@Applications/UseCases/Auth/Users/ReadUserByIdUseCase";
import { Request, Response } from "express";
import { container } from "IoC";

export class ReadUserByIdController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { id } = request.params;

    const readUserByIdUseCase = container.get(ReadUserByIdUseCase);

    const user = await readUserByIdUseCase.execute({id});
    const uri = `/api/v1/user/${user.data?.id}`
    return response.status(200).location(uri).json(user);
  }
}