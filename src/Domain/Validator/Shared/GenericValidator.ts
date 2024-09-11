import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { GenericErrorMessages } from "@Domain/Exceptions/Shared/GenericErrorMessages";

export class GenericValidator {
  textFieldEmptyOrNull(text: string) : void {
    if (!text || text.trim().length === 0) 
      throw new AppError(GenericErrorMessages.itCannotBeEmpty, 400);
  }
}