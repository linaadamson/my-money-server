class TransactionController {
  constructor(fastify, transactionService) {
    this.transactionService = transactionService;
    this.fastify = fastify;
  }

  // CREATE TRANSACTION FOR A USER
  async createTransaction(req, reply) {
    const { user_id, name, amount } = req.body;

    try {
      const transaction = await this.transactionService.createTransaction(
        user_id,
        name,
        amount
      );

      reply.status(201).send(transaction);
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  // GET ALL TRANSACTIONS FOR A USER
  async getTransactionById(req, reply) {
    const { id, day } = req.body;

    try {
      const result = await this.transactionService.findByUserId(id, day);
      reply.status(200).send(result);
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  // DELETE TRANSACTION
  async deleteTransactionById(req, reply) {
    let id = req.params.id;

    try {
      const result = await this.transactionService.deleteTransactionById(id);
      reply.status(200).send(result);
    } catch (err) {
      reply.status(500).send(err);
    }
  }
}

module.exports = TransactionController;
