require("dotenv").config();
const config = require("./config")(process.env);
const { logger } = require("./setup/logger");
const { httpLogger } = require("./setup/httpLogger");

const express = require("express");
const DB = require("./local_modules/db");
const { notFound, errorHandler } = require("./local_modules/middlewares");
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

  // Parser
  const parserRouter = require("./app/parser/routes.js");
  app.use("/parser", parserRouter({ logger, db }));

  // Knowledges
  const knowledgesRouter = require("./app/knowledge/routes.js");
  app.use("/knowledges", knowledgesRouter({ logger, db }));

  // Tags
  const tagsRouter = require("./app/tags/routes.js");
  app.use("/tags", tagsRouter({ logger, db }));

  //Healthcheck
  app.get("/healthcheck", (req, res) => {
    res.json({ status: "OK", env: config.env });
  });

  app.use(notFound);
  app.use(errorHandler(logger));

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
