import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { PermissionErrorMessages } from '@Domain/Exceptions/Errors/Auth/PermissionErrorMessages';
import { GenericValidator } from '../Shared/GenericValidator';
import { GenericEntityConstants } from '@Domain/Constants/Shared/GenericEntityConstant';
import { PermissionConstants } from '@Domain/Constants/Auth/PermissionsConstants';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';

export class PermissionsValidator extends GenericValidator{

  constructor(description: string) {
    super()
    this.descriptionIsValid(description)
  }

  private descriptionIsValid(description : string) : void {
    this.textFieldEmptyOrNull(description) 

    if(description.length > PermissionConstants.minLength ||
        description.length > PermissionConstants.maxLength)
      throw new AppError(new ResponseDTO<string>(PermissionErrorMessages.errorLength), 400);

    const regex = GenericEntityConstants.validCharsDescription;
    if (!regex.test(description)) 
      throw new AppError(new ResponseDTO<string>(PermissionErrorMessages.invalidCharsDescription), 404);
  }
}