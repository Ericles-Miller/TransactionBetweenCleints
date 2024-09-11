import { UserResponseDTO } from "@Applications/DTOs/Responses/Auth/Users/UserResponseDTO";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { GetIdRequestDTO } from "@Applications/DTOs/Shared/GetIdRequestDTO";
import { mapperUserResponse } from "@Applications/Mappings/mapperUserResponse";
import { UserErrorMessages } from "@Domain/Exceptions/Errors/Auth/UserErrorMessages";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { UsersRepository } from "@Infra/Repositories/Auth/UsersRepository";
import { inject, injectable } from "inversify";

@injectable()
export class ReadUserByIdUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUserRepository
  ) {}

  async execute({id}: GetIdRequestDTO) : Promise<ResponseDTO<UserResponseDTO>> {
    try {
      const user = await this.usersRepository.getById(id);
      if(!user) 
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 404);
      
      const response = mapperUserResponse(user);
      return new ResponseDTO<UserResponseDTO>(response);
      
    } catch (error) {
      if(error instanceof AppError)
        throw error;

      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedReadById), 500);
    }
  }
}