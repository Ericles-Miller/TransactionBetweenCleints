import { LogoutUseCase } from "@Applications/UseCases/Auth/AccessToken/LogoutUseCase";
import { Request, Response } from "express";
import { container } from "IoC";


export class LogoutController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {userId, refreshToken} = request.body;
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response.status(401).json({ message: 'Token is missing!' });
    }
    
    const [, token] = authToken?.split(' ');

    const logoutUseCase = container.get(LogoutUseCase);
    await logoutUseCase.execute({userId, refreshToken, token});

    return response.status(201).send();
  }
}