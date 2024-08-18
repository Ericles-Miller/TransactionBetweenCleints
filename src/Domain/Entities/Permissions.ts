import { BaseEntity } from "./shared/Base";

export class Permission extends BaseEntity {

  public description!: string;

  constructor(description: string, id: string| null) {
    super(id)
    this.setDescription(description);
  }

  setDescription(description: string) : void {
    // validar a descricao
    description = description;
  }

  getDescription() : string {
    return this.description.replace('Company.', '').replace('Client', '');
  }
}
