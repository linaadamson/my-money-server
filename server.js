require("dotenv").config();
const fastify = require("fastify")({
  logger: true,
});
fastify.register(require("@fastify/jwt"), {
  secret: process.env.SECRET,
});

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

// DECLARE ROUTES
fastify.register(require("./routes/auth"));
fastify.register(require("./routes/transaction"));

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
