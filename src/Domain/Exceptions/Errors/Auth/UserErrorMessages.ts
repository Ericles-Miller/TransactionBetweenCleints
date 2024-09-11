import { GenericEntityConstants } from "@Domain/Constants/Shared/GenericEntityConstant";
import { GenericErrorMessages } from "@Domain/Exceptions/Shared/GenericErrorMessages";

export class UserErrorMessages extends GenericErrorMessages {
  static invalidCharsEmail = "The email contains characters invalids";
  
  static invalidLengthName = `The username must be between ${GenericEntityConstants.maxLengthName} and 
    ${GenericEntityConstants.minLengthName} characters.`;
  
  static invalidCharsName = 'The name contains characters invalids.';

  static invalidLengthRefreshTokenCode = "O tamanho do código de token de atualização é inválido."; 
}