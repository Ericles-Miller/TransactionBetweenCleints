
export class UserConstants
{
  static validCharsEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  static lengthRefreshTokenCode = 36;
  static maxLengthRefreshTokenCode = 500;
  static minLengthPassword = 8;
  static maxLengthPassword = 25;
  static regexBalance = /^[0-9]+$/;
}