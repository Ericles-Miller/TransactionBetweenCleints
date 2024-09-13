import "reflect-metadata";
import "express-async-errors";
import {v4 as uuid} from 'uuid';
import { TransactionReversal } from "@Domain/Entities/Transactions/TransactionReversal";


describe('TransactionReversal Class', () => {
  let transactionReversal: TransactionReversal;
  let transactionId = uuid();
  beforeEach(() => {
    transactionReversal = new TransactionReversal(null,transactionId, 'reason');
  });

  test('should create a userPermission with valid properties', () => {
    expect(transactionReversal.reason).toBe('reason');
    expect(transactionReversal.transactionId).toBe(transactionId);
  });

})



