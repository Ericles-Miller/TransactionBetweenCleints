export class APISecrets {
  port = Number(process.env.PORT_APP);
  loggerEnvironment = process.env.LOGGER_ENVIRONMENT;
  loggerLevel = process.env.LOGGER_LEVEL;
  loggerServiceName = process.env.LOGGER_SERVICE_NAME;
  metricsEndPoint = process.env.METRICS_ENDPOINT;

  environment = process.env.ENVIRONMENT;
  frontAddress= process.env.FRONT_ADDRESS
}