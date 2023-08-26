module.exports = (fastify, containerService) => {
// DECLARE ROUTES
    fastify.register(require("./routes/auth")(containerService));
    fastify.register(require("./routes/transaction")(containerService));
    fastify.register(require("./routes/friend")(containerService));
}