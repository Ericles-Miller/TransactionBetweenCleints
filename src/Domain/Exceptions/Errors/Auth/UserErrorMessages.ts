import { UserConstants } from '@Domain/Constants/Auth/UserConstants';
import { GenericEntityConstants } from '@Domain/Constants/Shared/GenericEntityConstant';
import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';

export class UserErrorMessages extends GenericErrorMessages {
  static invalidCharsEmail = 'The email contains characters invalids';
  static emailExists = 'The email already exists';

  static invalidUser = 'user Not Found';
  static invalidLengthName = `The username must be between ${GenericEntityConstants.minLengthName} and 
    ${GenericEntityConstants.maxLengthName} characters.`;
  
  static UsersEmpty = `Don't exists users add`;
  static invalidCharsName = 'The name contains characters invalids.';

  static invalidLengthRefreshTokenCode = 'The refresh token code size is invalid.'; 

  static invalidLengthPassword = `The password must be between ${UserConstants.minLengthPassword} and 
    ${UserConstants.maxLengthPassword} characters.`;
  
  static balanceInvalid = 'The balance value should be than biggest 0, or contains just numbers.';

  static unexpectedReadAll = `${GenericErrorMessages.unexpectedServerError} to read all users.`;
  static unexpectedCreateUser = `${GenericErrorMessages.unexpectedServerError} to create a new User.`;
  static invalidId = 'User does not exists with identifier.';
  static unexpectedReadById = `${GenericErrorMessages.unexpectedServerError} to read user by Id.`;
  static unexpectedUpdateBalance = `${GenericErrorMessages.unexpectedServerError} to update balance.`;
  static userInactive = 'The user is inactive.';
  static unexpectedUpdateIsActive = `${GenericErrorMessages.unexpectedServerError} to updated is active`;

}