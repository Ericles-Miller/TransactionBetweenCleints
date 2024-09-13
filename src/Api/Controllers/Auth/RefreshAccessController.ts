import { RefreshAccessUseCase } from '@Applications/UseCases/Auth/AccessToken/RefreshAccessUseCase';
import { Request, Response } from 'express';
import { container } from 'IoC';

export class RefreshAccessController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { refreshTokenCode, email } = request.body;
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response.status(401).json({ message: 'Token is missing!' });
    }

    const [, token] = authToken?.split(' ');

    const refreshAccessUseCase = container.get(RefreshAccessUseCase);

    const responseData = await refreshAccessUseCase.execute({refreshTokenCode, email, token});

    return response.status(201).json(responseData);
  }
}