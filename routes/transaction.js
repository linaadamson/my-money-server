// REQUIRE THE MODELS
const models = require("../models/mySql");

// REQUIRE THE SERVICE
const TransactionService = require("../service/transactionService");

// REQUIRE THE CONTROLLER
const TransactionController = require("../controllers/transactionController");

function transactionRoute(fastify, options, done) {
  // INITIALISE THE SERVICE WITH THE MODELS
  const transactionService = new TransactionService(models);
  const transactionHandler = new TransactionController(
    fastify,
    transactionService
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
