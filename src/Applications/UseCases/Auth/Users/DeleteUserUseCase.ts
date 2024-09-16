import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { GetIdRequestDTO } from "@Applications/DTOs/Shared/GetIdRequestDTO";
import { UserErrorMessages } from "@Domain/Exceptions/Errors/Auth/UserErrorMessages";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { GenericErrorMessages } from "@Domain/Exceptions/Shared/GenericErrorMessages";
import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import LoggerComponent from "@Infra/Logging/LoggerComponent";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteUserUseCase {
  private readonly logger = new LoggerComponent(DeleteUserUseCase.name);

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({id}: GetIdRequestDTO): Promise<void> {
    try {
      const user = await this.usersRepository.getById(id);
      if(!user)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidUser), 404);
  
      await this.usersRepository.delete(id);

    } catch(error) {
      if(error instanceof AppError) {
        this.logger.warn(GenericErrorMessages.invalidAction, error);
        throw error;
      }
      this.logger.error(UserErrorMessages.unexpectedDeleteUser, error);
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedDeleteUser), 500);
    }
  }
}