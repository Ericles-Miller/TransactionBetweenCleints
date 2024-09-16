import { UpdateUserUseCase } from '@Applications/UseCases/Auth/Users/UpdateUserUseCase';
import { GenericConstants } from '@Domain/Constants/Shared/GenericConstants';
import { container } from '@IoC/index';
import { Request, Response } from 'express';

export class UpdateUserController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {name, password, balance} = request.body;
    const sub = request.user?.sub;    
    if(!sub)
      return response.json({message: 'UserId invalid'});

    const updateUserUseCase = container.get(UpdateUserUseCase);

    await updateUserUseCase.execute({balance,id:sub, name, password});

    const uri = `${GenericConstants.baseUrl}/users/${sub}`;

    return response.status(201).location(uri).json({ message: 'User updated successfully' });;
  }
}