import * as winston from "winston";
import * as path from "path";

const errorFile = path.join("./", "/logs/error.log");

const { combine, timestamp, prettyPrint } = winston.format;

const fileLogger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new winston.transports.File({ filename: errorFile, level: "error" })
    ],
    exitOnError: false
});

export default fileLogger;
