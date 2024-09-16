import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';

export class AppError {
  public readonly message: ResponseDTO<string>;
  public readonly statusCode: number;

  constructor(message: ResponseDTO<string>, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
