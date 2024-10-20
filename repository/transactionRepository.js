class TransactionRepository {
  constructor(model) {
    this.source = new model();
  }

  async createTransaction(user_id, name, amount, breakdown) {
    const transaction = await this.source.createTransaction(
      user_id,
      name,
      amount,
      breakdown
    );
    return transaction;
  }
  async findByUserId(id, day) {
    const transaction = await this.source.findByUserId(id, day);
    return transaction;
  }

  async deleteTransactionById(id) {
    const transaction = await this.source.deleteTransactionById(id);
    return transaction;
  }
}

module.exports = TransactionRepository;
