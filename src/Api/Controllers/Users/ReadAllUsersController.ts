import { ReadAllUsersUseCase } from '@Applications/UseCases/Auth/Users/ReadAllUsersUseCase';
import { container } from '@IoC/index';
import { Request, Response } from 'express';

export class ReadAllUsersController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const readAllUsersUseCase = container.get(ReadAllUsersUseCase);

    const users = await readAllUsersUseCase.execute();

    return response.json(users).status(201);
  }
}