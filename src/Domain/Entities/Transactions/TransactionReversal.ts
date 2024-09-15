import { Transaction } from './Transaction';
import {v4 as uuid} from 'uuid';

export class TransactionReversal {
  id!: string;
  transactionId!: string;
  transaction?: Transaction;
  reason!: string;

  constructor(id: string | null, transactionId: string, reason: string) {
    if(id === null)
      this.id = uuid();

    this.setReason(reason);
    this.setTransactionId(transactionId);
  }

  setTransactionId(transactionId : string) : void {
    this.transactionId = transactionId;
  }

  setReason(reason: string) : void {
    this.reason = reason;
  }
}