const BaseController = require("./baseController");

class AuthController extends BaseController {
  constructor(container) {
    super(container);
    this.authService = this.container.get("authService");
    this.jwtService = this.container.get("jwtService");
  }

  async signUp(req, reply) {
    const { email, password, displayName } = req.body;

    try {
      const user = await this.authService.signupUser(
        email,
        password,
        displayName
      );
      const token = this.jwtService.sign(
        { id: user.id },
        process.env.SECRET || "",
        {
          expiresIn: "7d",
        }
      );

      reply.code(201).send({ token, displayName, id: user.id });
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  async logIn(req, reply) {
    const { email, password } = req.body;

    try {
      const user = await this.authService.loginUser(email, password);

      if (user == 404) {
        return reply.code(404).send({ message: "User not found" });
      }

      if (user == 401) {
        return reply.code(401).send({ message: "Password incorrect" });
      }

      console.log("password correct");
      const token = this.jwtService.sign(
        { id: user.id },
        process.env.SECRET || "",
        {
          expiresIn: "7d",
        }
      );
      return reply
        .code(200)
        .send({ token, displayName: user.display_name, id: user.id });
    } catch (err) {
      reply.status(500).send(err);
    }
  }
}

module.exports = AuthController;
