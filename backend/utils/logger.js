const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

const logsDirectory = path.join(__dirname, "logs");

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(logsDirectory, "error.log"),
      level: "error",
      format: format.combine(format.uncolorize()),
    }),
    new transports.File({
      filename: path.join(logsDirectory, "combined.log"),
      format: format.combine(format.uncolorize()),
    }),
  ],
});

const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = { logger, stream };
