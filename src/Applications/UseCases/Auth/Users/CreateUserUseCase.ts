import { ICreateUserRequestDTO } from '@Applications/DTOs/Requests/Auth/ICreateUserRequestDTO';
import { PrismaMapper } from '@Applications/Mappings/AutoMapping.Profile';
import { User } from '@Domain/Entities/User';
import { AppError } from '@Domain/Exceptions/AppError';
import { Users } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { UserResponseDTO } from '@Applications/DTOs/Responses/UserResponseDTO';
import { plainToInstance } from 'class-transformer';
import { IWriteUserRepository } from '@Domain/Interfaces/Repositories/Users/IWriteUserRepository';
import { IReadUserRepository } from '@Domain/Interfaces/Repositories/Users/IReadUserRepository';
import { AddPermissions } from '@Applications/UseCases/Shared/AddPermissions';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('WriteUserRepository')
    private writeUsersRepository: IWriteUserRepository,

    @inject('ReadUserRepository')
    private readUsersRepository: IReadUserRepository,

    @inject(AddPermissions)
    private addPermission: AddPermissions
  ) {}

  async execute({ email, name, password, permissions }: ICreateUserRequestDTO) : Promise<UserResponseDTO> {
    const userExists = await this.readUsersRepository.checkEmailAlreadyExist(email);
    if(userExists)
      throw new AppError('User already exists!', 400);

    const user = new User(name, email, null);
    await user.setPassword(password)
        
    const mapper = new PrismaMapper<User, Users>(); 
    let prismaUser = mapper.map(user);
    
    prismaUser = await this.writeUsersRepository.create(prismaUser);  
    
    await this.addPermission.execute(prismaUser, permissions);

    // send email 
    return plainToInstance(UserResponseDTO, user);
  }
}