require("dotenv").config();
const containerService = require("./core/container");
const Exception = require("./utils/exception");

const fastify = require("fastify")({
  logger: true,
});
fastify.register(require("@fastify/jwt"), {
  secret: process.env.SECRET,
});

fastify.register(require("fastify-jsend"));

// REMOVE CORS
fastify.register(require("@fastify/cors"), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true,
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false;
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions);
  };
});


// BOOTSRTAP
require("./boostrap")(fastify, containerService);

// DECLARE ROUTES
fastify.register(require("./routes/auth")(containerService));
fastify.register(require("./routes/transaction")(containerService));
fastify.register(require("./routes/friend")(containerService));

// MIDDLEWARE FOR ERROR
fastify.setErrorHandler((error, request, reply) => {
  if (error instanceof Exception) {
    reply.jsendError(Error, { code: error.statusCode, message: error.message });
  } else {
    // Handle other exceptions or errors
    reply.jsendError(Error, { code: 500, message: "Internal Server Error" });
  }
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
