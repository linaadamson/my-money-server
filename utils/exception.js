class Exception extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "Exception";
    this.statusCode = statusCode || 500;
  }
}

module.exports = Exception;
