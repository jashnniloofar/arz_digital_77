import * as config from 'config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const WinstonConfigs = {
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'error-%DATE%.log',
      dirname: config.get('logs.dir'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
      maxFiles: config.get('logs.error.maxFiles'),
      maxSize: config.get('logs.error.maxSize'),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'debug-%DATE%.log',
      dirname: config.get('logs.dir'),
      datePattern: 'YYYY-MM-DD',
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
      maxFiles: config.get('logs.debug.maxFiles'),
      maxSize: config.get('logs.debug.maxSize'),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
      level: 'error',
    }),
  ],
};
