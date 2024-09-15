import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { BaseEntity } from './Base';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { GenericErrorMessages } from '@Domain/Exceptions/Shared/GenericErrorMessages';

export abstract class BaseIsActive extends BaseEntity {
  isActive!: boolean; 

  constructor(id: string | null) {
    super(id);
  }
  protected activate() : void {
    if(this.isActive)
      throw new AppError(new ResponseDTO<string>(GenericErrorMessages.isActive), 400);
   
    this.isActive = true;
  }        
    
  protected deactivate() : void {
    if(!this.isActive)
      throw new AppError(new ResponseDTO<string>(GenericErrorMessages.isInactive), 400);

    this.isActive = false;
  }

  public setIsActive(status : boolean) : void {
    status ? this.activate() : this.deactivate()
    this.setUpdatedAt();
  }
}