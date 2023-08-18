// CONTAINER SERVICE
const di = require("../boostrap");

// REQUIRE THE CONTROLLER
const AuthController = require("../controllers/authController");

function authRoute(fastify, options, done) {
  const authHandler = new AuthController(fastify, di["AuthService"]);

  // SIGN UP USER
  fastify.post("/signup", async (req, reply) => {
    await authHandler.signUp(req, reply);
  });

  // LOGIN USER
  fastify.post("/login", async (req, reply) => {
    await authHandler.logIn(req, reply);
  });

  done();
}

module.exports = authRoute;
