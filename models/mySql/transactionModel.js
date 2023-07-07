const { sequelize, Op, Transaction } = require("./modelInstances");

class TransactionModel {
  constructor() {}

  async createTransaction(user_id, name, amount) {
    const transaction = await Transaction.create({
      user_id: user_id,
      transaction_name: name,
      amount: amount,
    });

    return transaction;
  }

  async findByUserId(id, day) {
    const transaction = await Transaction.findAll({
      where: {
        [Op.and]: [
          { user_id: id },
          day
            ? {
                where: sequelize.literal(
                  `date(createdAt) >= NOW()  - INTERVAL ${day} day`
                ),
              }
            : "",
        ],
      },
      order: [["createdAt", "DESC"]],
    });

    return transaction;
  }

  async deleteTransactionById(id) {
    const transaction = await Transaction.destroy({
      where: {
        id: id,
      },
    });

    return transaction;
  }
}

module.exports = TransactionModel;
