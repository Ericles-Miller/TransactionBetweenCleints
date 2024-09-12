import { User } from "@Domain/Entities/Auth/User";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { AuthUserRepository } from "@Infra/Repositories/Auth/AuthUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateUserTokenUseCase {
  constructor(
    @inject('AuthUserRepository')
    private authUserRepository: AuthUserRepository
  ) {}

  async execute(user: User, refreshToken: string) : Promise<void> {
    const findUser = await this.authUserRepository.authGetByEmail(user.email);
    if(!findUser) 
      throw new AppError('Access Denied', 400);

    if(findUser.isActive === false)
      throw new AppError('Access Denied', 400);

    user.setRefreshToken(refreshToken);
    user.setLatLogin();
    user.setUpdatedAt();

    await this.authUserRepository.updateUserRefreshToken(user);
  }
}