export class CreateUserRequestDTO {
  name: string = '';
  email: string = '';
  password: string = '';
  permissions: string[] = [];
  balance!: number;
}