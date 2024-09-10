
export interface IReadUserRepository {
  checkEmailAlreadyExist(email: string) : Promise<boolean>
  findNameByEmail(email: string) : Promise<string|null>
}