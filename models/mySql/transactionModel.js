const { sequelize, Op, Transaction, Breakdown } = require("./modelInstances");

class TransactionModel {
  constructor() {}

  async createTransaction(user_id, name, amount, breakdowns) {
    const transaction = await Transaction.create({
      user_id: user_id,
      transaction_name: name,
      amount: amount,
    });

    if (breakdowns) {
      breakdowns.map(async (item) => {
        const breakdown = await Breakdown.create({
          transactionId: transaction.id,
          breakdown_name: item.name,
          breakdown_amount: item.amount,
        });
      });
    }

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
                  `date(Transaction.createdAt) >= NOW()  - INTERVAL ${day} day`
                ),
              }
            : "",
        ],
      },
      include: { model: Breakdown },
      order: [["createdAt", "DESC"]],
    });

    return transaction;
  }

  async deleteTransactionById(id) {
    const breakdown = await Breakdown.destroy({
      where: {
        transactionId: id,
      },
    });

    const transaction = await Transaction.destroy({
      where: {
        id: id,
      },
    });

    return transaction, breakdown;
  }
}

module.exports = TransactionModel;
