const HttpError = require("fblind-http-error");

function notFound(req, res, next) {
  const error = new HttpError(
    "NOT_FOUND",
    `Not found - ${req.originalUrl}`,
    404
  );
  res.status(404);
  next(error);
}

function errorHandler(logger) {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, _next) => {
    logger.error(err.message);
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  };
}

module.exports = {
  notFound,
  errorHandler,
};
