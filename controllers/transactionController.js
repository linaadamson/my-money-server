const BaseController = require("./baseController");

class TransactionController extends BaseController {
  constructor(container) {
    super(container);
    this.transactionService = this.container.get("transactionService")();
    this.exception = this.container.get("exception");
  }

  // CREATE TRANSACTION FOR A USER
  async createTransaction(req, reply) {
    const { user_id, name, amount, breakdown } = req.body;

    try {
      const transaction = await this.transactionService.createTransaction(
        user_id,
        name,
        amount,
        breakdown
      );

      return reply.jsendSuccess({ transaction });
    } catch (err) {
      throw this.exception("An issue occured");
    }
  }

  // GET ALL TRANSACTIONS FOR A USER
  async getTransactionById(req, reply) {
    const { id, day } = req.body;

    try {
      const result = await this.transactionService.findByUserId(id, day);

      return reply.jsendSuccess({ result: [...result] });
    } catch (err) {
      throw this.exception("An issue occured");
    }
  }

  // DELETE TRANSACTION
  async deleteTransactionById(req, reply) {
    let id = req.params.id;

    try {
      const result = await this.transactionService.deleteTransactionById(id);

      return reply.jsendSuccess({ result });
    } catch (err) {
      throw this.exception("An issue occured");
    }
  }
}

module.exports = TransactionController;
