import 'reflect-metadata';
import 'express-async-errors';
import { User } from '@Domain/Entities/Auth/User';
import { AppError } from '@Domain/Exceptions/Shared/AppError';

describe('User Class', () => {
  let user: User;

  beforeEach(() => {
    user = new User('John Doe', 'john@example.com', 1000, '1');
  });

  test('should create a user with valid properties', () => {
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.balance).toBe(1000);
    expect(user.id).toBe('1');
    
  });


describe('User Class', () => {
  test.each([
    ['', 'valid@example.com', 100],
    ['@asfg #fdsf&&', 'valid@example.com', 100],
    ['John Doe', 'valid@example.com', -100],
    ['John Doe', '!!email.com', 300],
    ['John Doe', 'invalidemail', 300],
    ['John Doe', 'user@.com', 300],
    ['John Doe', 'user@com', 300],
    ['John Doe', 'user@com.', 300],
  ])('should throw an AppError for invalid name, email, or balance', (name: string, email: string, balance: number) => {
    expect(() => {
      new User(name, email, balance, null);
    }).toThrow(AppError);
  });
});


  test('should set and hash password correctly', async () => {
    await user.setPassword('securepassword');
    expect(user.password).toBeDefined();
    // You might want to add more specific checks for the hashed password
  });

  test('should set last login correctly', () => {
    user.setLatLogin();
    expect(user.lastLogin).toBeInstanceOf(Date);
  });

  test('should set balance correctly', () => {
    user.setBalance(2000);
    expect(user.balance).toBe(2000);
  });
});
