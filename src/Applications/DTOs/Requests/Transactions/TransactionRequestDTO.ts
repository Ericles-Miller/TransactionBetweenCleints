export class TransactionRequestDTO {
  senderId: string = '';
  receivedId: string = '';
  amount!: number;
  sub?: string
}