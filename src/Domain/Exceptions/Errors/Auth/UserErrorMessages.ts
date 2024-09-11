import { UserConstants } from "@Domain/Constants/Auth/UserConstants";
import { GenericEntityConstants } from "@Domain/Constants/Shared/GenericEntityConstant";
import { GenericErrorMessages } from "@Domain/Exceptions/Shared/GenericErrorMessages";

export class UserErrorMessages extends GenericErrorMessages {
  static invalidCharsEmail = "The email contains characters invalids";
  
  static invalidLengthName = `The username must be between ${GenericEntityConstants.minLengthName} and 
    ${GenericEntityConstants.maxLengthName} characters.`;
  
  static invalidCharsName = 'The name contains characters invalids.';

  static invalidLengthRefreshTokenCode = "The refresh token code size is invalid."; 

  static invalidLengthPassword = `The password must be between ${UserConstants.minLengthPassword} and 
    ${UserConstants.maxLengthPassword} characters.`
}