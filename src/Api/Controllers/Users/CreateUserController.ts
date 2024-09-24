import { UserResponseDTO } from '@Applications/DTOs/Responses/Auth/Users/UserResponseDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { CreateUserUseCase } from '@Applications/UseCases/Auth/Users/CreateUserUseCase';
import { container } from '@IoC/index';
import { Request, Response } from 'express';


export class CreateUserController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {
      email, name, password, permissions, balance,
    } = request.body;

    const useCase = container.get(CreateUserUseCase);

    const user = await useCase.execute({email, name, password, permissions, balance});

    const uri = `api/v1/users/${user.id}`;
    
    return response.status(201).location(uri).json(new ResponseDTO<UserResponseDTO>(user));
  }
}