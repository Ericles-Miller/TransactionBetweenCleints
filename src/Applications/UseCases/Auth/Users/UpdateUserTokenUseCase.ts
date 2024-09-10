import { PrismaMapper } from "@Applications/Mappings/AutoMapping.Profile";
import { User } from "@Domain/Entities/User";
import { AppError } from "@Domain/Exceptions/AppError";
import { AuthUserRepository } from "@Infra/Repositories/Auth/AuthUserRepository";
import { Users } from "@prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateUserTokenUseCase {
  constructor(
    @inject('AuthUserRepository')
    private authUserRepository: AuthUserRepository
  ) {}

  async execute(email: string, refreshToken: string) : Promise<void> {
    const user = await this.authUserRepository.authGetByEmail(email);
    if(!user) 
      throw new AppError('Access Denied', 400);

    if(user.isActive === false)
      throw new AppError('Access Denied', 400);

    // // fazer o mapping 
    // const userMapper  = new PrismaMapper<Users, User>();
    // const mappedUser: User = userMapper.map(user);


    // mappedUser.setRefreshToken(refreshToken);
    // mappedUser.setLatLogin();
    // mappedUser.setUpdatedAt();

    // await this.authUserRepository.updateUser(mappedUser);
  }
}