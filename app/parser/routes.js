const axios = require("axios");
const cheerio = require("cheerio");
const router = require("express").Router();

module.exports = function _router({ logger }) {
  // TODO: Revisar
  const scrapperFactory = require("../scrapper/factory.js")({
    axios,
    cheerio,
  });

  const { parserService } = require("./feature-services/index.js")({
    scrapperFactory,
  });

  const postParser = require("./handlers/post-parse");

  router.route("/").post(postParser({ parserService, logger }).handler);

  return router;
};
