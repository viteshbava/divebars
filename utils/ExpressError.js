// our own custom error class (an extension of the built in Error class)
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
