const {
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
  NOT_FOUND,
} = require("http-status-codes");
const { AppError } = require("../../library/helpers/errorFormatHelpers");

module.exports = {
  InvalidInput: (
    content = {},
    message = "Invalid form inputs",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
  UserExist: (
    content = {},
    message = "User already exist",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
  UserNotFound: (
    content = {},
    message = "User not found.",
    name = null,
    innerException = null
  ) => new AppError(name, NOT_FOUND, message, content, innerException),
  WrongCredential: (
    content = {},
    message = "Wrong credentials.",
    name = null,
    innerException = null
  ) => new AppError(name, UNAUTHORIZED, message, content, innerException),
  TokenNotFound: (
    content = {},
    message = "Token Not Found",
    name = null,
    innerException = null
  ) => new AppError(name, UNAUTHORIZED, message, content, innerException),
  ActionFailed: (
    content = {},
    message = "Action failed",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
};
