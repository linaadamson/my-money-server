const BaseController = require("./baseController");

class TransactionController extends BaseController {
  constructor() {
    super();
    this.transactionService = this.container.get("transactionService");
  }

  // CREATE TRANSACTION FOR A USER
  async createTransaction(req, reply) {
    const { user_id, name, amount, breakdown } = req.body;

    console.log(breakdown);

    try {
      const transaction = await this.transactionService.createTransaction(
        user_id,
        name,
        amount,
        breakdown
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
