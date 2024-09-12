

export class TransactionResponseDTO {
  id!: string;
  sender!: string;
  received!: string;
  amount!: number;
  status!: string
  createdAt!: Date;
  updatedAt: Date | null = null;
  code!: string;

}