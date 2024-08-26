import {v4 as uuid} from 'uuid';

export abstract class BaseEntity {
  public id: string; 
  public createdAt!: Date;
  public updatedAt!: Date | null;

    constructor() {
    this.id = uuid();
    this.createdAt = new Date();
    this.updatedAt = null;
  }

  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}
