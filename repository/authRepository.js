class AuthRepository {
  constructor(model) {
    this.source = new model();
  }

  async createUser(email, hash, displayName) {
    const user = await this.source.createUser(email, hash, displayName);
    return user;
  }

  async findByEmail(email) {
    const user = await this.source.findByEmail(email);
    return user;
  }
}

module.exports = AuthRepository;
