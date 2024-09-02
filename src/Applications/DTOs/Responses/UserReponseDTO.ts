import { AutoMap } from "@automapper/classes";

export class UserResponseDTO {
  @AutoMap()
  id! : string;
  @AutoMap()
  isActive!: boolean;
  @AutoMap()
  createdAt!: Date;
  @AutoMap()
  updateAt?: Date;
  @AutoMap()
  name!: string;
  @AutoMap()
  email!: string;
  @AutoMap()
  lastLogin!: Date;
  @AutoMap()
  createdBy!: string;
  @AutoMap()
  updatedBy?: string;

}