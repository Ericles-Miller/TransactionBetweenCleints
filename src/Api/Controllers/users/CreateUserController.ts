import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { CreateUserUseCase } from "@Applications/UseCases/Auth/Users/CreateUserUseCase";
import { Request, Response } from "express";
import { container } from "IoC";


export class CreateUserController {

  async handle(request: Request, response: Response) : Promise<Response> {
    const {
      email, name, password, permissions
    } = request.body;

    const useCase = container.get(CreateUserUseCase);

    const user = await useCase.execute({email, name, password, permissions});
    const uri = `api/v1/users/${user.id}`;
    
    return response.status(201).location(uri).json(user);
  }
}