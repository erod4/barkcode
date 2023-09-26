const globalErrorHandler = (err, req, res, next) => {
  //message
  //status
  //statuscode
  //stack
  const statusCode = (err.statusCode = err.satusCode || 500);
  const status = (err.status = err.status || "error");
  const message = err.message;
  const stack = err.stack;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

module.exports = globalErrorHandler;
