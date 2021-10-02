require("dotenv").config();
const config = require("./config")(process.env);
const { logger } = require("./setup/logger");
const { httpLogger } = require("./setup/httpLogger");

const express = require("express");
const DB = require("./local_modules/db");
const app = express();

function setUpApp(db) {
  // TODO: set up
  const cors = require("cors");
  app.use(cors());
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // logger
  app.use(httpLogger("tiny"));

  // TODO: register routes from modules
  const axios = require("axios");
  const cheerio = require("cheerio");
  const scrapperFactory = require("./app/scrapper/factory")({
    axios,
    cheerio,
  });
  // const scrapper = require('./app/scrapper/scrapper')({ axios, cheerio })
  const { parserService } = require("./app/parser/feature-services")({
    scrapperFactory,
  });
  const postParser = require("./app/parser/handlers/post-parse")({
    parserService,
  });
  app.post("/parser", postParser.handler);

  // TODO: DB Setup
  // const db = { knowledges: [] };
  // TODO: DB Setup repos
  const { KnowledgeRepo } = require("./app/repos")({ db });
  // TODO: initialize in routes ?
  const { knowledgeCreate } = require("./app/knowledge/feature-services")({
    KnowledgeRepo,
  });
  const postKnowledges = require("./app/knowledge/handlers/post-knowledges")({
    knowledgeCreate,
  });
  app.post("/knowledges", postKnowledges.handler);

  const { knowledgeList } = require("./app/knowledge/feature-services")({
    KnowledgeRepo,
  });
  const getKnowledges = require("./app/knowledge/handlers/get-knowledges")({
    knowledgeList,
  });

  app.get("/knowledges", getKnowledges.handler);

  const { knowledgeGet } = require("./app/knowledge/feature-services")({
    KnowledgeRepo,
  });
  const getKnowledgeById =
    require("./app/knowledge/handlers/get-knowledges-id")({
      knowledgeGet,
    });

  app.get("/knowledges/:id", getKnowledgeById.handler);

  const tagsRouter = express.Router("/tags"); // eslint-disable-line new-cap
  const tagsRouters = require("./app/tags/routes.js");
  tagsRouters(tagsRouter, { logger, db });

  app.use(tagsRouter);

  //Healthcheck
  app.get("/healthcheck", (req, res) => {
    res.json({ status: "OK", env: config.env });
  });

  // eslint-disable-next-line no-unused-vars
  app.use("/", function defaultErrorHandler(err, req, res, _next) {
    logger.error(err.message);
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  });

  app.listen(config.port, () => {
    logger.info("Starting server");
  });
}

const _db = new DB(config.db, logger);
_db
  .connect()
  .then((db) => {
    setUpApp(db);
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

function logError(err) {
  try {
    logger.error("UNCAUGHT EXCEPTION", err);
  } catch (e) {
    console.log("UNCAUGHT EXCEPTION:", e, err);
  }
}

process.on("unhandledRejection", logError);
process.on("uncaughtException", logError);

module.exports = app;
