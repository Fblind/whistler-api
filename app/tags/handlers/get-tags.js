const HttpError = require("fblind-http-error");
module.exports = (dependencies) => {
  return {
    handler: _handler(dependencies),
  };
};

function createError(err) {
  const knownErrors = {
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
function validate(_query) {
  return true;
}

function _handler({ tagsList }) {
  return async (req, res, next) => {
    return Promise.resolve()
      .then(async () => {
        validate(req.query);
        const response = await tagsList.execute(req.body);
        return res.status(200).json(_formatDocument(response));
      })
      .catch(createError)
      .catch(next);
  };
}
