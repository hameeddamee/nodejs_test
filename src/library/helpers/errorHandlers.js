const PrettyError = require("pretty-error");
const pe = new PrettyError();

const logger = require("./loggerHelpers");

module.exports = new errorHandler();

function errorHandler() {
  this.handleErrors = function (app) {
    logger.debug("Error handler now registers to handle all errors");

    app.use((err, req, res, next) => {
      this.logAndNotifyAboutError(err);
      res
        .status(err.httpCode ? err.httpCode : 500)
        .json(this.getFriendlyResponse(err));
      next();
    });

    process.on("uncaughtException", (error) => {
      this.logAndNotifyAboutError(error);
      this.crashIfNotOperational(error);
    });

    process.on("unhandledRejection", (reason, p) => {
      this.logAndNotifyAboutError(reason);
      this.crashIfNotOperational(reason);
    });
  };

  this.isErrorOperational = function (error) {
    logger.warn(error.isOperational);
    return error.isOperational ? true : false;
  };

  this.crashIfNotOperational = function (error) {
    if (!this.isErrorOperational(error)) {
      logger.info(
        "Error handler concluded that this error is not trusted thus exiting"
      );
      process.exit(1);
    }
  };

  this.logAndNotifyAboutError = function (error) {
    console.error(`Error handler is reporting a new error:`);
    const pretifiedError = pe.render(error);
    logger.error(pretifiedError);
  };

  this.getFriendlyResponse = function (error) {
    return {
      message: error.message,
      content: error.content,
      success: false,
    };
  };
}
