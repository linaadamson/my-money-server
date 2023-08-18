const container = require("./core/container");
const models = require("./models/mySql");

// SERVICES
const TransactionService = require("./service/transactionService");
const FriendService = require("./service/friendService");
const AuthService = require("./service/authService");

// REGISTER SERVICES
container.register("TransactionService", () => {
  return new TransactionService(models, container);
});
container.register("FriendService", () => {
  return new FriendService(models, container);
});
container.register("AuthService", () => {
  return new AuthService(models, container);
});

// RESOLVE AND EXPORT RESOLVED DEPENDENCIES
module.exports = container.resolve([
  "TransactionService",
  "FriendService",
  "AuthService",
]);
