import winston from 'winston';
import { LoggerConfig } from './LoggerConfig';
import { LoggerBuild } from './LoggerBuild';


export default class LoggerComponent {
  private logger: winston.Logger;

  constructor(className: string) {
    const loggerConfig = new LoggerConfig();
    this.logger = loggerConfig.createLogger(className);
  }

  debug(message: string, context?: object): void {
    const object = LoggerBuild.buildObjectLogger(message, context);
    this.logger.debug(object);
  }

  info(message: string, context?: object): void {
    const object = LoggerBuild.buildObjectLogger(message, context);
    this.logger.info(object);
  }

  error(message: string, error:unknown, context?: object): void {
    const object = LoggerBuild.buildObjectLogger(message, context, error);
    this.logger.error(object);
  }

  public warm(message: string, context?: object): void {
    const object = LoggerBuild.buildObjectLogger(message, context);
    this.logger.warn(object);
  }
}