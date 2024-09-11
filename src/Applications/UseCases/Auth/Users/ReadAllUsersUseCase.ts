import { UserResponseDTO } from "@Applications/DTOs/Responses/Auth/Users/UserResponseDTO";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { mapperUserResponse } from "@Applications/Mappings/mapperUserResponse";
import { UserErrorMessages } from "@Domain/Exceptions/Errors/Auth/UserErrorMessages";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class ReadAllUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository
  ) {}

  async execute(): Promise<ResponseDTO<UserResponseDTO[]>> {
    try {
      const users = await this.usersRepository.readAll();
      if(users.length === 0)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.UsersEmpty), 404);

      const responses = users.map((user) => {
        return mapperUserResponse(user);
      });

      return new ResponseDTO<UserResponseDTO[]>(responses);
    } catch (error) {
      if(error instanceof AppError)
        throw error;
      
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedReadAll), 500);
    }
  }
}