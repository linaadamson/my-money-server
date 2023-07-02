class TransactionRepository {
  constructor(model) {
    this.source = new model();
  }

  async createTransaction(user_id, name, amount) {
    const transaction = await this.source.createTransaction(
      user_id,
      name,
      amount
    );
    return transaction;
  }
  async findByUserId(id) {
    const transaction = await this.source.findByUserId(id);
    return transaction;
  }

  async deleteTransactionById(id) {
    const transaction = await this.source.deleteTransactionById(id);
    return transaction;
  }
}

module.exports = TransactionRepository;
