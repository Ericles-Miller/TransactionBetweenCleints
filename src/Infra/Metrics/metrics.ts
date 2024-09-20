import { Configuration } from '@Domain/Config';
import LoggerComponent from '@Infra/Logging/LoggerComponent';
import express from 'express';
import client from 'prom-client';

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success'],
});

export async function startMetricsServer() {
  const logger = new LoggerComponent(startMetricsServer.name);

  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get('/metrics', async (request, response) => {
    response.set('Content-Type', client.register.contentType);

    return response.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    logger.info(`Metrics server started at ${Configuration.apiSecrets.metricsEndPoint}`);
  });
}