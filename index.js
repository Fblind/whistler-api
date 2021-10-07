require("dotenv").config();
const path = require("path");
const config = require("./config")(process.env);
const { logger } = require("./setup/logger");
const { httpLogger } = require("./setup/httpLogger");

const express = require("express");
const DB = require("./local_modules/db");
const { notFound, errorHandler } = require("./local_modules/middlewares");
const app = express();

function registerRoutes(basePath, deps) {
  return (_app) => {
    const fs = require("fs");
    const modules = fs.readdirSync(basePath);
    modules.forEach((m) => {
      const routerPath = `${basePath}/${m}/routes.js`;
      if (fs.existsSync(routerPath)) {
        const router = require(routerPath);
        _app.use(`/${m}`, router(deps));
        deps.logger.info("Registered " + m);
      }
    });
  };
}

function setUpApp(db) {
  // TODO: set up
  const cors = require("cors");
  app.use(cors());
  app.use(express.json());

  // logger
  app.use(httpLogger("tiny"));

  // route registration
  registerRoutes(path.join(__dirname, "app"), { logger, db })(app);

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
