import { ReadUserByIdUseCase } from '@Applications/UseCases/Auth/Users/ReadUserByIdUseCase';
import { Request, Response } from 'express';
import { container } from '@IoC/index';
import { UserResponseDTO } from '@Applications/DTOs/Responses/Auth/Users/UserResponseDTO';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';

export class ReadUserByIdController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { id } = request.params;

    const readUserByIdUseCase = container.get(ReadUserByIdUseCase);

    const user = await readUserByIdUseCase.execute({id});
    const uri = `/api/v1/user/${user.id}`;

    return response.status(200).location(uri).json(new ResponseDTO<UserResponseDTO>(user));
  }
}