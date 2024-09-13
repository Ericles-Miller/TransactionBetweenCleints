import { AddPermissions } from "@Applications/UseCases/Shared/AddPermissions";
import { PermissionRepositoryInMemory } from "./RepositoriesInMemory/Auth/PermissionRepositoryInMemory";
import { UserRepositoryInMemory } from "./RepositoriesInMemory/Auth/UserRepositoryInMemory"
import { UserPermissionsRepositoryInMemory } from "./RepositoriesInMemory/Auth/UserPermissionsRepositoryInMemory";
import { IUserPermissionsRepository } from "@Domain/Interfaces/Repositories/Auth/IUserPermissionsRepository";
import { CreateUserUseCase } from "@Applications/UseCases/Auth/Users/CreateUserUseCase";
import { UserResponseDTO } from "@Applications/DTOs/Responses/Auth/Users/UserResponseDTO";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";

let repository: UserRepositoryInMemory;
let permissionRepository: PermissionRepositoryInMemory; 
let userPermissionRepository : IUserPermissionsRepository;

describe('Create a User', () => {
  beforeEach(() => {
    repository = new UserRepositoryInMemory();
    permissionRepository = new PermissionRepositoryInMemory();
    userPermissionRepository = new UserPermissionsRepositoryInMemory();
  });

  it('should be able create a new user', async () => {
    const createUserUseCase = new CreateUserUseCase(
      repository, permissionRepository, new AddPermissions(userPermissionRepository)
    );

    expect(await createUserUseCase.execute({
      email: 'valid@email.com',
      password: '123456543aa',
      permissions: ['9f1cc9a9-a294-4c28-8c9d-344de1ae0ecd'],
      balance :1000,
      name: 'Jon Doe' 
    })).toBe(Promise<ResponseDTO<UserResponseDTO>>);
  })
})