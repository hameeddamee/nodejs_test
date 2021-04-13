/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware 
  with next()
*/

const catchErrors = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

/*
  Custom Error Handler

  This is derived from Node’s Error. It centralizes error object within the app
*/
function AppError(
  name = "generic",
  httpCode = 500,
  message = "Uknown error has occured",
  content = {},
  isOperational = false,
  innerException = null
) {
  Error.captureStackTrace(this, AppError);
  this.name = name;
  this.date = new Date();
  this.httpCode = httpCode;
  this.content = content;
  this.isOperational = isOperational;
  this.message = message;
  this.innerException = innerException;
}

module.exports = {
  catchErrors,
  AppError,
};
