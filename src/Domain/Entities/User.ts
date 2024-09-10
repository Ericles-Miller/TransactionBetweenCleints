import { hash } from "bcryptjs";
import { BaseIsActive } from "./shared/BaseIsActive";
import { UsersPermission } from "./UsersPermission";

export class User extends BaseIsActive {  
  
  name!: string;
  email!: string; 
  password!: string; 
  lastLogin: Date | null = null; 
  createdBy: string | null = null; 
  updatedBy?: string | null = null;
  usersPermissions?: UsersPermission[];
  refreshTokenCode?: string;
 
  constructor(name: string, email: string, id: string | null) {
    super(id)
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

  setLatLogin() : void {
    this.lastLogin = new Date();
    this.setUpdatedAt();
  }

  setRefreshToken(code : string) {
    this.refreshTokenCode = code;
  }
}