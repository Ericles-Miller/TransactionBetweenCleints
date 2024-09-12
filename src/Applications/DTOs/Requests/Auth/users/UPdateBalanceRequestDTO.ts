import { Users } from "@prisma/client";


export class UPdateBalanceRequestDTO {
  receivedId!: string;
  sender!: Users;
  amount!: number;
}