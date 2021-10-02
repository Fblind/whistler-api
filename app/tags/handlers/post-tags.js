const HttpError = require("fblind-http-error");
module.exports = (dependencies) => {
  return {
    handler: _handler(dependencies),
  };
};

function createError(err) {
  const knownErrors = {
    TAG_EXISTS: () => {
      throw new HttpError(
        err.message,
        "The tag that you're trying to create already exists in the system",
        400
      );
    },
    DEFAULT: () => {
      throw new HttpError("FATAL_ERROR", "Internal Server Error", 500);
    },
  };

  const error = knownErrors[err.message] || knownErrors.DEFAULT;
  return error();
}

function _formatDocument(entity) {
  return entity;
}

// eslint-disable-next-line no-unused-vars
function validate(_body) {
  return true;
}

function _handler({ tagsCreate }) {
  return async (req, res, next) => {
    return Promise.resolve()
      .then(async () => {
        validate(req.body);
        const response = await tagsCreate.execute(req.body);
        return res.status(200).json(_formatDocument(response));
      })
      .catch(createError)
      .catch(next);
  };
}
