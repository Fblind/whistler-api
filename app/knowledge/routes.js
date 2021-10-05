const router = require("express").Router();

module.exports = function _router({ logger, db }) {
  const { KnowledgeRepo } = require("../repos/index.js")({ db });
  const postKnowledges = require("./handlers/post-knowledges");
  const getKnowledges = require("./handlers/get-knowledges");
  const getKnowledgeById = require("./handlers/get-knowledges-id");

  const { knowledgeCreate, knowledgeList, knowledgeGet } =
    require("./feature-services/index.js")({
      KnowledgeRepo,
    });

  router
    .route("/")
    .post(postKnowledges({ knowledgeCreate, logger }).handler)
    .get(getKnowledges({ knowledgeList, logger }).handler);

  router.route("/:id").get(getKnowledgeById({ knowledgeGet, logger }).handler);

  return router;
};
