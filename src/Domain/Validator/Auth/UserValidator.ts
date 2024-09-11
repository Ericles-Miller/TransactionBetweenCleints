import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { GenericValidator } from "../Shared/GenericValidator";
import { UserConstants } from "@Domain/Constants/Auth/UserConstants";
import { UserErrorMessages } from "@Domain/Exceptions/Errors/Auth/UserErrorMessages";
import { GenericEntityConstants } from "@Domain/Constants/Shared/GenericEntityConstant";

export class UserValidator extends GenericValidator{

  validateEmail(email: string) : void {
    this.textFieldEmptyOrNull(email);

    const regex = UserConstants.validCharsEmail;
    if(!regex.test(email))
      throw new AppError(UserErrorMessages.invalidCharsEmail, 400);
  }

  validateName(name: string): void {
    this.textFieldEmptyOrNull(name);

    if(name.length <= GenericEntityConstants.minLengthName || name.length > GenericEntityConstants.maxLengthName)
      throw new AppError(UserErrorMessages.invalidLengthName, 400);

    const regex = GenericEntityConstants.validCharName;
    if(!regex.test(name))
      throw new AppError(UserErrorMessages.invalidCharsName, 400);
  }

  validateRefreshTokenCode(refreshToken: string): void {
    this.textFieldEmptyOrNull(refreshToken);

    if(refreshToken.length < UserConstants.lengthRefreshTokenCode || 
        refreshToken.length > UserConstants.maxLengthRefreshTokenCode) 
      throw new AppError(UserErrorMessages.invalidLengthRefreshTokenCode, 400);
  }

}