import { UpdateBalanceRequestDTO } from "@Applications/DTOs/Requests/Auth/users/UpdateBalanceRequestDTO";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { UserErrorMessages } from "@Domain/Exceptions/Errors/Auth/UserErrorMessages";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { IUserRepository } from "@Domain/Interfaces/Repositories/Auth/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateBalanceUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ receivedId, amount, sender }: UpdateBalanceRequestDTO): Promise<boolean> {
    try {
      const user = await this.usersRepository.getById(receivedId);
      if(!user)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidId), 404);

      if(!user.isActive)
        throw new AppError(new ResponseDTO<string>(UserErrorMessages.userInactive), 404);

      try {
        await this.usersRepository.updateBalance(receivedId, user.balance + amount);
        await this.usersRepository.updateBalance(sender.id, sender.balance - amount);
        return false;
      } catch {
        await this.usersRepository.updateBalance(receivedId, user.balance - amount);
        await this.usersRepository.updateBalance(sender.id, sender.balance + amount);
        return true;
      }
    
    } catch (error) {
      if(error instanceof AppError)
        throw error

      throw new AppError(new ResponseDTO<string>(UserErrorMessages.unexpectedUpdateBalance), 500);
    }
  }
}