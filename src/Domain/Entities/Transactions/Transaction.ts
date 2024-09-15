import { GenericConstants } from '@Domain/Constants/Shared/GenericConstants';
import { BaseEntity } from '../Shared/Base';
import { TransactionValidator } from '@Domain/Validator/Transactions/TransactionsValidator';


export class Transaction extends BaseEntity {
  private readonly validator = new TransactionValidator();
  id!: string;
  senderId!: string;
  receivedId!: string
  amount!: number;
  status!: string;
  code!: string;
  
  constructor(senderId : string, receiverId: string, amount: number, id: string | null) {
    super(id);
    this.setSenderId(senderId);
    this.setReceivedId(receiverId);
    this.setAmount(amount);
    this.setStatus('PENDING');
    this.setCode();
  }

  setSenderId(senderId: string): void {
    this.senderId = senderId;
  }

  setReceivedId(receivedId: string) : void {
    this.receivedId = receivedId;
  }

  setAmount(amount: number): void {
    this.validator.validateAmount(amount);
    this.amount = amount
  }

  setStatus(status: string): void {
    this.validator.validateStatus(status);
    this.status = status;
  }

  setCode(): void {
    const chars = GenericConstants.charCode;
    let code = '';

    for (let i = 0; i <=50; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }

    this.code = code;
  }
}