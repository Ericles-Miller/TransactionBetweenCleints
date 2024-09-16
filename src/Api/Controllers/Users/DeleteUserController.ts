import { DeleteUserUseCase } from "@Applications/UseCases/Auth/Users/DeleteUserUseCase";
import { container } from "@IoC/index";
import { Request, Response } from "express";



export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sub = request.user?.sub;    
    if(!sub)
      return response.json({message: 'UserId invalid'});
    
    const deleteUserUseCase = container.get(DeleteUserUseCase);

    await deleteUserUseCase.execute({id: sub});

    return response.status(201).send();
  }
}