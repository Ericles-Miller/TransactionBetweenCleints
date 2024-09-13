import { LoginUserUseCase } from '@Applications/UseCases/Auth/AccessToken/LoginUserUseCase';
import { Request, Response } from 'express';
import { container } from 'IoC';

export class LoginUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {email, password } = request.body;

    const loginUserUseCase = container.get(LoginUserUseCase);

    const responseData = await loginUserUseCase.execute({ email, password });

    return response.json(responseData);
  }
}