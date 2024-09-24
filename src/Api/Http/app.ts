import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './Router';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { DatabaseConnection } from '@Infra/DataBase/database';
import { Configuration } from '@Domain/Config/Configuration';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import responseTime from "response-time";
import { responseMetric } from '@Infra/Metrics/responseTime';
import { startMetricsServer } from '@Infra/Metrics/metrics';
import cors from 'cors';
import helmet from 'helmet';
import { Limiter } from '@Api/Extensions/Limiter';

export const app = express();

app.use(express.json());
app.use(router);

app.use(Limiter.usersLimiter);
app.use(Limiter.authLimiter);
app.use(helmet());

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


new Configuration();
new DatabaseConnection().checkConnection();

app.use(cors({ origin: Configuration.apiSecrets.frontAddress})) 
  ? Configuration.apiSecrets.environment === 'production'
  : app.use(cors());


startMetricsServer();
app.use(responseTime(responseMetric));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);
