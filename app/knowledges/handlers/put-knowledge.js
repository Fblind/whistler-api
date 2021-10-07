const HttpError = require("fblind-http-error");

// TODO: no me encanta, revisar
const config = require("../../../config")(process.env);
const DB = require("../../../local_modules/db");

module.exports = (dependencies) => {
  return {
    handler: _handler(dependencies),
  };
};

function createError(err) {
  console.log(err.message);
  const knownErrors = {
    WRONG_BODY_KEY: () => {
      throw new HttpError("WRONG_BODY_KEY", "Invalid body", 400);
    },
    BODY_IS_REQUIRED: () => {
      throw new HttpError(
        "BODY_IS_REQUIRED",
        "The body of the request should be a valid knowledge object",
        400
      );
    },
    KNOWLEDGE_NOT_EXISTS: () => {
      throw new HttpError(
        "KNOWLEDGE_NOT_EXISTS",
        "The knowledge that you're trying to update does not exists",
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
function validate(deps) {
  return async ({ body, params, query }) => {
    validateParams(params);
    await validateBody(body);
    validateQuery(query);
  };
}

async function validateBody(_body) {
  const keys = Object.keys(_body);
  if (!keys.length) {
    throw new Error("BODY_IS_REQUIRED");
  }

  const validKeys = [
    "title",
    "url",
    "imageUrl",
    "description",
    "notes",
    "tags",
    "type",
    "embedUrl",
    "embed",
  ];

  for (const key of keys) {
    if (!validKeys.includes(key)) throw new Error("WRONG_BODY_KEY");
  }
}
// eslint-disable-next-line no-unused-vars
function validateQuery(_query) {
  return true;
}

function validateParams(_params) {
  const db = new DB(config.db);
  if (!db.isValidObjectId(_params.id)) throw new Error("KNOWLEDGE_NOT_EXISTS");
}

function _handler({ knowledgeEdit }) {
  return async (req, res, next) => {
    return Promise.resolve()
      .then(async () => {
        await validate({ knowledgeEdit })({
          body: req.body,
          params: req.params,
          query: req.query,
        });
        const response = await knowledgeEdit.execute({
          ...req.body,
          id: req.params.id,
        });
        return res.status(200).json(_formatDocument(response));
      })
      .catch(createError)
      .catch(next);
  };
}
