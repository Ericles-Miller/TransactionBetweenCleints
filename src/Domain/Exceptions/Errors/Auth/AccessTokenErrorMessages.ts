import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';


export class AccessTokenErrorMessages {
  static emailOrPasswordInvalid = 'Email or password incorrect!';
  static AccessDenied = 'Access Denied';
  static invalidToken = 'Token is missing.';  
  static unexpectedLogout = `${GenericErrorMessages.unexpectedServerError} to logout.`;
  static unexpectedRefreshAccess = `${GenericErrorMessages.unexpectedServerError} to refresh access token`;
  static passwordLogger = 'Login attempt with incorrect password for user';
  static unauthorized = 'Unauthorized.';
}