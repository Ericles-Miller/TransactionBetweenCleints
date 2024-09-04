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
  usersPermissions?: UsersPermission[];
 
  constructor(name: string, email: string) {
    super()
    this.setEmail(email);
    this.setName(name);
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