import { AppError } from "@Domain/Exceptions/Shared/AppError";
import { GenericValidator } from "../Shared/GenericValidator";
import { UserConstants } from "@Domain/Constants/Auth/UserConstants";
import { UserErrorMessages } from "@Domain/Exceptions/Errors/Auth/UserErrorMessages";
import { GenericEntityConstants } from "@Domain/Constants/Shared/GenericEntityConstant";
import { ResponseDTO } from "@Applications/DTOs/Responses/Shared/ResponseDTO";

export class UserValidator extends GenericValidator{

  validateEmail(email: string) : void {
    this.textFieldEmptyOrNull(email);

    const regex = UserConstants.validCharsEmail;
    if(!regex.test(email))
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidCharsEmail), 400);
  }

  validateName(name: string): void {
    this.textFieldEmptyOrNull(name);

    if(name.length <= GenericEntityConstants.minLengthName || name.length > GenericEntityConstants.maxLengthName)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidLengthName), 400);

    const regex = GenericEntityConstants.validCharName;
    if(!regex.test(name))
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidCharsName), 400);
  }

  validateRefreshTokenCode(refreshToken: string): void {
    this.textFieldEmptyOrNull(refreshToken);

    if(refreshToken.length < UserConstants.lengthRefreshTokenCode || 
        refreshToken.length > UserConstants.maxLengthRefreshTokenCode) 
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidLengthRefreshTokenCode), 400);
  }

  validatePassword(password: string): void {
    if(password.length < UserConstants.minLengthPassword || password.length > UserConstants.maxLengthPassword)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.invalidLengthPassword), 400);   
  }

  validateBalance(balance: number) : void {
    if(balance < 0 || NaN) 
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.balanceInvalid), 400);

    const regex = UserConstants.regexBalance;
    if(!regex.test)
      throw new AppError(new ResponseDTO<string>(UserErrorMessages.balanceInvalid), 404);
  }

}