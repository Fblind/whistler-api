const DB = require("../local_modules/db.js");
const { logger } = require("../setup/logger.js");
const config = require("../config.js")(process.env);

(async () => {
  logger.info("running setup");
  const db = new DB(config.db, logger);
  global.dbConnection = await db.connect();
})();
