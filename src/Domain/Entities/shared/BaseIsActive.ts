import { AppError } from "@Domain/Exceptions/AppError";
import { BaseEntity } from "./Base";

export abstract class BaseIsActive extends BaseEntity {
  isActive!: boolean; 

  protected activate() : void
  {
    this.isActive ? new AppError("Is already active", 400) : true;
  }        
    
  protected deactivate() : void
  {
    this.isActive ? false : new AppError("Is already inactive", 400);
  }

  public setIsActive(status : boolean) : void {
    status ? this.activate() : this.deactivate()
    this.setUpdatedAt();
  }
}