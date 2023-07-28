const TransactionRepository = require("../repository/transactionRepository");

class TransactionService {
  constructor(models) {
    this.transactionRepo = new TransactionRepository(models.transactionModel);
  }

  async createTransaction(user_id, name, amount, breakdown) {
    const transaction = await this.transactionRepo.createTransaction(
      user_id,
      name,
      amount,
      breakdown
    );
    return transaction;
  }

  async findByUserId(id, day) {
    const transaction = await this.transactionRepo.findByUserId(id, day);
    return transaction;
  }

  // DELETE TRANSACTION
  async deleteTransactionById(id) {
    const transaction = await this.transactionRepo.deleteTransactionById(id);
    return transaction;
  }
}

module.exports = TransactionService;
