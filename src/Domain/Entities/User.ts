import { BaseIsActive } from "./shared/BaseIsActive";


export class User extends BaseIsActive {
  name  : string;
  email: string;
  password : string;
  lastLogin : Date;
  //userPermissions: UserPermission[]  = [];
 
  constructor(name: string, password: string, email: string, id: string| null) {
    super(id)
   
  }

  setEmail(email:string) {
    // validate email
    this.email = email;
  }
}