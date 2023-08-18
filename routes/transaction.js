// CONTAINER SERVICE
const di = require("../boostrap");

// REQUIRE THE CONTROLLER
const TransactionController = require("../controllers/transactionController");

function transactionRoute(fastify, options, done) {
  const transactionHandler = new TransactionController(
    fastify,
    di["TransactionService"]
  );

  // CREATE TRANSACTION
  fastify.post("/createTransaction", async (req, reply) => {
    await transactionHandler.createTransaction(req, reply);
  });

  // GET ALL THE USERS TRANSACTIONS
  fastify.post("/transactions", async (req, reply) => {
    await transactionHandler.getTransactionById(req, reply);
  });

  // DELETE A SINGLE TRANSACTION
  fastify.delete("/deleteTransaction/:id", async (req, reply) => {
    await transactionHandler.deleteTransactionById(req, reply);
  });

  done();
}

module.exports = transactionRoute;
