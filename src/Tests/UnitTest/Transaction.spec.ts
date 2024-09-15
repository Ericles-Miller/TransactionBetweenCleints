import 'reflect-metadata';
import 'express-async-errors';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { Transaction } from '@Domain/Entities/Transactions/Transaction';
import { v4 as uuid} from 'uuid';


describe('Transaction Class', () => {
  let transaction: Transaction;

  beforeEach(() => {
    transaction = new Transaction(uuid(), uuid(), 1000, '1');
  });

  test('should create a transaction with valid properties', () => {
    expect(transaction.amount).toBe(1000);
    expect(transaction.id).toBe('1');
    
  });


describe('transaction Class', () => {
  test.each([
    [0.0],
    [-100],
    [-20.1],
    ])('should throw an AppError for invalid amount', (amount: number) => {
    expect(() => {
      new Transaction(uuid(), uuid(), amount, null);
    }).toThrow(AppError);
  });
});



describe('transaction Class', () => {
  test.each([
    ['anything'],
    ])('should throw an AppError for invalid amount', (status: string) => {
    expect(() => {
      transaction.setStatus(status)
    }).toThrow(AppError);
  });
});

  test('should set status correctly', async () => {
    transaction.setStatus('COMPLETED');
    expect(transaction.status).toBe('COMPLETED');
  });

  test('should set updated At correctly', () => {
    transaction.setUpdatedAt();
    expect(transaction.updatedAt).toBeInstanceOf(Date);
  });
  
});
