// REQUIRE THE MODELS
const models = require("../models/mySql");

// REQUIRE THE SERVICE
const AuthService = require("../service/authService");

// REQUIRE THE CONTROLLER
const AuthController = require("../controllers/authController");

function authRoute(fastify, options, done) {
  const authService = new AuthService(models);
  const authHandler = new AuthController(fastify, authService);

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
