export class TransactionsErrorsMessages {
  static invalidAmount = "The transaction value must be greater than 0 or different from null.";
  static invalidStatus = "The value status is invalid.";
  static invalidReceived = "The user does not exists or id is incorrect.";
  static invalidSender = 'The user does not exists or id is incorrect.';
  static insufficientBalance = 'The account balance is less than the transaction.'
  static sameUser = 'it is not possible to make a transaction for the same user.';
  static invalidCode = 'Does not exists transactions with this code.';
}