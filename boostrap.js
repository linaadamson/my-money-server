const models = require("./models/mySql");

// SERVICES
const TransactionService = require("./service/transactionService");
const FriendService = require("./service/friendService");
const AuthService = require("./service/authService");
const JwtService = require("./service/jwtService");

function setupContainerService(fastify, container) {
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
  container.register("jwtService", () => {
    return new JwtService(fastify, container);
  });
  return container;
}

// RESOLVE AND EXPORT RESOLVED DEPENDENCIES
module.exports = (fastify, containerService) =>
  setupContainerService(fastify, containerService);
