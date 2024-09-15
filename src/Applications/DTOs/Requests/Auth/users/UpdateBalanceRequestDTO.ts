import { Users } from '@prisma/client';

export class UpdateBalanceRequestDTO {
  receivedId: string = '';
  sender!: Users;
  amount!: number;
}