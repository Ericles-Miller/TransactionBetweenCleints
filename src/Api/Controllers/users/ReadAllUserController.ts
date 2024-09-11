import { ReadAllUsersUseCase } from "@Applications/UseCases/Auth/Users/ReadAllUsersUseCase";
import { Request, Response } from "express";
import { container } from "IoC";

export class ReadAllUserController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const readAllUsersUseCase = container.get(ReadAllUsersUseCase);

    const users = await readAllUsersUseCase.execute();

    return response.json(users).status(201);
  }
}