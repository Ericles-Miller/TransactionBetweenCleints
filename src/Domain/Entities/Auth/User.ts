import { hash } from "bcryptjs";
import { UserValidator } from "@Domain/Validator/Auth/UserValidator";
import { BaseIsActive } from "../shared/BaseIsActive";
import { UserPermissions } from "./UserPermissions";

const validator = new UserValidator();
export class User extends BaseIsActive {  
  name!: string;
  email!: string; 
  password!: string; 
  lastLogin: Date | null = null; 
  createdBy: string | null = null; 
  updatedBy?: string | null = null;
  userPermissions?: UserPermissions[];
  refreshTokenCode?: string;
 
  constructor(name: string, email: string, id: string | null) {
    super(id)
    this.setEmail(email);
    this.setName(name);
  }

  setEmail(email:string) {
    validator.validateEmail(email);
   
    this.email = email;
    this.setUpdatedAt();
  }

  setName(name: string){
    validator.validateName(name);
    
    this.name = name;
    this.setUpdatedAt();
  }

  async setPassword(password: string) : Promise<void> {
    validator.validatePassword(password);

    const passwordHash = await hash(password, 8);
    this.password = passwordHash;
    this.setUpdatedAt();
  }

  setLatLogin() : void {
    this.lastLogin = new Date();
    this.setUpdatedAt();
  }

  setRefreshToken(code : string) {
    validator.validateRefreshTokenCode(code);
    this.refreshTokenCode = code;
  }
}