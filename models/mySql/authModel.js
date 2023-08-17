const { User } = require("./modelInstances");

class AuthModel {
  constructor() {
    this.id = "";
  }

  async createUser(email, hash, displayName) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      await user.update({ password_hash: hash, display_name: displayName });
    }

    if (!user) {
      await User.create({
        email: email,
        password_hash: hash,
        display_name: displayName,
      });
    }

    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email: email } });

    return user;
  }
}

module.exports = AuthModel;
