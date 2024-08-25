import { hash } from "bcryptjs";
import { BaseIsActive } from "./shared/BaseIsActive";
import { UsersPermission } from "./UsersPermission";

export class User extends BaseIsActive {  
  name!: string;
  email!: string; 
  password!: string; 
  lastLogin? : Date; 
  createdBy? : string; 
  updatedBy?: string; 

  userPermissions: UsersPermission[]  = [];
 
  constructor(name: string, password: string, email: string, id: string| null) {
    super(id)
    this.setEmail(email);
    this.setName(name);
    this.setPassword(password);
  }

  setEmail(email:string) {
    // validate email
    this.email = email;
    this.setUpdatedAt();
  }

  setName(name: string){
    //validate name
    this.name = name;
    this.setUpdatedAt();
  }

  async setPassword(password: string) : Promise<void> {
    //validate password
    const passwordHash = await hash(password, 8);
    this.password = passwordHash;
    this.setUpdatedAt();
  }

  setLatLogin() {
    this.lastLogin = new Date();
    this.setUpdatedAt();
  }
}