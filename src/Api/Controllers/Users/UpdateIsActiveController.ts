import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { UpdateIsActiveUseCase } from '@Applications/UseCases/Auth/Users/UpdateIsActiveUseCase';
import { GenericConstants } from '@Domain/Constants/Shared/GenericConstants';
import { Request, Response } from 'express';
import { container } from 'IoC';

export class UpdateIsActiveController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { id } = request.params;
    const { isActive } = request.body;

    const updateIsActiveUseCase = container.get(UpdateIsActiveUseCase);

    await updateIsActiveUseCase.execute({id, isActive});

    const uri = `${GenericConstants.baseUrl}/users/${id}/updateIsActive`;
    
    return response.status(200).location(uri).json(new ResponseDTO<string>('User status updated successfully'));
  }
}