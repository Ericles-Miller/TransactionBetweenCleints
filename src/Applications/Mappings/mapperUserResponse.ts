import { UserResponseDTO } from "@Applications/DTOs/Responses/Auth/Users/UserResponseDTO";
import { Users } from "@prisma/client";


export function mapperUserResponse(user: Users) : UserResponseDTO {
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