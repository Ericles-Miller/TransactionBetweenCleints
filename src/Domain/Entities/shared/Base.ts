import {v4 as uuid} from 'uuid';

export abstract class BaseEntity {
  public id: string; 
  public createdAt!: Date;
  public updatedAt!: Date | null;

    constructor(id: string | null) {
    if(!id) {
      this.id = uuid();
      this.createdAt = new Date();
      this.updatedAt = null;
    } else {
      this.id = id;
      this.createdAt = this.createdAt;
    }

  }

  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}
