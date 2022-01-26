const HttpError = require("fblind-http-error");

module.exports = (dependencies) => {
  return {
    handler: _handler(dependencies),
  };
};

function createError(err) {
  const knownErrors = {
    KNOWLEDGE_EXISTS: () => {
      throw new HttpError(
        "KNOWLEDGE_EXISTS",
        "A knowledge with that url already exists",
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

function _handler({ knowledgeCreate }) {
  return async (req, res, next) => {
    return Promise.resolve()
      .then(async () => {
        // TODO: validate body - see put-knowledge.js
        const response = await knowledgeCreate.execute(req.body);
        return res.status(201).json(_formatDocument(response));
      })
      .catch(createError)
      .catch(next);
  };
}
