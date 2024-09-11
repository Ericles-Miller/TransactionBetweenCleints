export class UserResponseDTO {
  id! : string;
  isActive!: boolean;
  createdAt!: Date;
  updateAt: Date | null = null;
  name!: string;
  email!: string;
  lastLogin: Date | null = null;
}