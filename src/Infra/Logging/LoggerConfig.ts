import { Configuration } from '@Domain/Config';
import { Format } from 'logform';
import winston, { Logger } from 'winston';


export class LoggerConfig  {
  private setFormat() : Format {
    const settings : Format[] = [
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.json(),
    ];

    if(Configuration.apiSecrets.loggerEnvironment?.toLowerCase() === 'local') {
      settings.pop();
      settings.unshift(winston.format.colorize({
        all: true,
      }));

      settings.push(winston.format.printf((info) => {
        const context = !info.context?'': ` | context: ${JSON.stringify(info.context)}`;
        const error = !info.error?'': ` | error: ${JSON.stringify(info.error)}`;
        return `[${info.timestamp}] | ${info.level}: ${info.message} | class name: ${info.className} ${context} ${error}`;
      }));
    }

    return winston.format.combine(...settings);
  }

  createLogger(className: string) : Logger {
    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    }; 

    const transports = [new winston.transports.Console()];
    return winston.createLogger({
      level: Configuration.apiSecrets.loggerLevel || 'info',
      format: this.setFormat(),
      levels,
      transports,
      defaultMeta: {
        serviceName: Configuration.apiSecrets.loggerServiceName || 'default-service',
        className,
      },
    });
  }
}