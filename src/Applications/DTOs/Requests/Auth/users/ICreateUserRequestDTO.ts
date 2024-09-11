
export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  permissions: string[];
  balance: number;
}