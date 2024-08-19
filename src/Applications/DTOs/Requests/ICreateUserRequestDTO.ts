import { Permission } from "@Domain/Entities/Permissions";

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
}