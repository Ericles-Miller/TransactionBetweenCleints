import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";
import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { GenericErrorMessages } from "@Domain/Exceptions/Shared/GenericErrorMessages";

export class GenericValidator {
  textFieldEmptyOrNull(text: string) : void {
    if (!text || text.trim().length === 0) 
      throw new AppError(new ResponseDTO<string>(GenericErrorMessages.itCannotBeEmpty), 400);
  }
}