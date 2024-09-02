
export interface IReadUserRepository {
  checkEmailAlreadyExist(email: string) : Promise<boolean>,
}