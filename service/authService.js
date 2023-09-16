const AuthRepository = require("../repository/authRepository");
const bcrypt = require("bcrypt");

class AuthService {
  constructor(models) {
    this.authRepo = new AuthRepository(models.authModel);
    this.saltRounds = 10;
  }

  async signupUser(email, password, displayName) {
    const hash = bcrypt.hashSync(password, this.saltRounds);
    const user = await this.authRepo.createUser(email, hash, displayName);
    return user;
  }

  async loginUser(email, password) {
    const user = await this.authRepo.findByEmail(email);

    if (user === null) {
      return 404;
    }

    if (!bcrypt.compareSync(password, user.password_hash)) {
      return 401;
    }

    return user;
  }
}

module.exports = AuthService;
