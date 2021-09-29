// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/production/smartlogging.md
// https://github.com/winstonjs/winston
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  // defaultMeta: { app: "whistler-api" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = {
  logger,
};
