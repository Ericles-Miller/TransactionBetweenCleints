import { RefreshAccessUseCase } from "@Applications/UseCases/Auth/AccessToken/RefreshAccessUseCase";
import { Request, Response } from "express";
import { container } from "IoC";


export class RefreshAccessController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { refreshTokenCode, email } = request.body;

    const refreshAccessUseCase = container.get(RefreshAccessUseCase);

    const responseData = await refreshAccessUseCase.execute({refreshTokenCode, email});

    return response.status(201).json(responseData);
  }
}