import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';

export class PermissionErrorMessages extends GenericErrorMessages {
  static permissionIdNotExists = 'The Id of permissions does not exists';
  static arrayPermissionsError = 'Some of permission id is invalid.';
  static errorLength = 'Number of characters must be greater than 3 and less than 50.';
  static permissionsNull = 'The permissions field is empty';
}