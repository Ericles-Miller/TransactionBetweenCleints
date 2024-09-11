import { GenericErrorMessages } from "@Domain/Exceptions/Shared/GenericErrorMessages";

export class PermissionErrorMessages extends GenericErrorMessages {
  static permissionIdNotExists = 'The Id of permissions does not exists';
  static errorLength = 'Number of characters must be greater than 3 and less than 50.'
}