const router = require("express").Router();

module.exports = function _router({ logger, db }) {
  const postTags = require("./handlers/post-tags.js");
  const getTags = require("./handlers/get-tags.js");

  const { TagRepo } = require("../repos/index.js")({ db });
  const { tagsCreate, tagsList } = require("./feature-services/index.js")({
    TagRepo,
  });

  router
    .route("/")
    .post(postTags({ tagsCreate, logger }).handler)
    .get(getTags({ tagsList, logger }).handler);

  return router;
};
