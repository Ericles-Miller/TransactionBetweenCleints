import { CreateUserUseCase } from "@Applications/UseCases/Auth/CreateUserUseCase";
import { Request, Response } from "express";
import { container } from "IoC";


export class CreateUserController {

  async handle(request: Request, response: Response) : Promise<Response> {
    const {
      email, name, password, permissions
    } = request.body;

    const useCase = container.get(CreateUserUseCase);

    await useCase.execute({email, name, password, permissions});

    return response.status(201).send();
  }
}