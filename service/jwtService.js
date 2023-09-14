class JwtService {
  constructor(fastify) {
    this.fastify = fastify;
  }

  async sign(payload) {
    const token = this.fastify.jwt.sign(payload);
    return token;
  }
}

module.exports = JwtService;