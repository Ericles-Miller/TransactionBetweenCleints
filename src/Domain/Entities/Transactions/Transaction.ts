import { BaseEntity } from "../Shared/Base";
import { TransactionValidator } from "@Domain/Validator/Transactions/TransactionsValidator";


export class Transaction extends BaseEntity {
  private readonly validator = new TransactionValidator();
  id!: string;
  senderId!: string;
  receivedId!: string
  amount!: number;
  status!: string;
  
  constructor(senderId : string, receiverId: string, amount: number, id: string | null) {
    super(id);
    this.setSenderId(senderId);
    this.setReceivedId(receiverId);
    this.setAmount(amount);
    this.setStatus('PENDING');
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
}