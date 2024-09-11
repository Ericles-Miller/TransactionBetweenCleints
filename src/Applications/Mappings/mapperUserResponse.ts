import { UserResponseDTO } from "@Applications/DTOs/Responses/Auth/Users/UserResponseDTO";
import { User } from "@Domain/Entities/Auth/User";


export function mapperUserResponse(user: User) : UserResponseDTO {
  const response: UserResponseDTO = {
    createdAt: user.createdAt,
    email: user.email,
    id: user.id,
    isActive: user.isActive,
    lastLogin: user.lastLogin,
    name: user.name,
    updateAt: user.updatedAt
  }

  return response;  
}