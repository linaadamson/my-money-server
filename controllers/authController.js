const BaseController = require("./baseController");

class AuthController extends BaseController {
  constructor(container) {
    super(container);
    this.authService = this.container.get("authService")();
    this.jwtService = this.container.get("jwtService")();
    this.exception = this.container.get("exception");
  }

  async signUp(req, reply) {
    const { email, password, displayName } = req.body;

    try {
      const user = await this.authService.signupUser(
        email,
        password,
        displayName
      );
      const token = await this.jwtService.sign(
        { id: user.id },
        process.env.SECRET || "",
        {
          expiresIn: "7d",
        }
      );

      return reply.jsendSuccess({
        token,
        displayName,
        id: user.id,
      });
    } catch (err) {
      console.log(err);
      throw this.exception("An issue occured");
    }
  }

  async logIn(req, reply) {
    const { email, password } = req.body;

    try {
      const user = await this.authService.loginUser(email, password);

      if (user == 404) {
        return reply.jsendError({ code: 404, message: "Invalid Email" });
      }

      if (user == 401) {
        return reply.jsendError({ code: 401, message: "Password incorrect" });
      }

      console.log("password correct");

      if (user) {
        const token = await this.jwtService.sign(
          { id: user.id },
          process.env.SECRET || "",
          {
            expiresIn: "7d",
          }
        );

        return reply.jsendSuccess({
          token,
          displayName: user.display_name,
          id: user.id,
        });
      }
    } catch (err) {
      console.log(err);
      throw this.exception("An issue occured");
    }
  }
}

module.exports = AuthController;
