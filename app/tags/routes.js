module.exports = function route(router, { logger, db }) {
  const postTags = require("./handlers/post-tags.js");
  const { TagRepo } = require("../repos/index.js")({ db });
  const { tagsCreate } = require("./feature-services/index.js")({ TagRepo });

  router.route("/tags").post(postTags({ tagsCreate, logger }).handler);

  return router;
};
