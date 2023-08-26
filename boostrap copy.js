const container = require("./core/container");
const models = require("./models/mySql");

// SERVICES
const TransactionService = require("./service/transactionService");
const FriendService = require("./service/friendService");
const AuthService = require("./service/authService");

function setupContainerService(fastify) {
  // REGISTER SERVICES
  container.register("transactionService", () => {
    return new TransactionService(models, container);
  });
  container.register("friendService", () => {
    return new FriendService(models, container);
  });
  container.register("authService", () => {
    return new AuthService(models, container);
  });

  container.register('JWT', () => {
    return fastify.jwt
  })

}


// RESOLVE AND EXPORT RESOLVED DEPENDENCIES
module.exports = (fastify) => {
  return container.resolve([
    "TransactionService",
    "FriendService",
    "AuthService",
    "JWT"
  ]);
}
