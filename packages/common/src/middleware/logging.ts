import { createLogger, transports, format } from "winston";
import morgan from "morgan";
import { FileTransportOptions } from "winston/lib/winston/transports";

interface InfoConfig {
  timestamp?: string;
  level?: string;
  message?: string;
}
interface Extender extends FileTransportOptions {
  json?: boolean;
}
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    format.printf(
      (info: InfoConfig) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new transports.File({
      filename: "./logs/all-logs.log",
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    } as Extender),
    new transports.Console(),
  ],
});

logger.stream = {
  write: (message: string) =>
    logger.info(message.substring(0, message.lastIndexOf("\n"))),
} as any;

export const logging = morgan(
  ":method :url :status :response-time ms - :res[content-length]",
  { stream: (logger.stream as unknown) as morgan.StreamOptions }
);
