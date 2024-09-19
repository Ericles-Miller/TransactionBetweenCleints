import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { router } from './Router';
import { AppError } from '@Domain/Exceptions/Shared/AppError';
import { DatabaseConnection } from '@Infra/DataBase/database';
import { Configuration } from '@Domain/Config';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import responseTime from "response-time";
import { responseMetric } from '@Infra/Metrics/responseTime';
import { startMetricsServer } from '@Infra/Metrics/metrics';


export const app = express();
app.use(express.json());
app.use(router);

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

startMetricsServer();
app.use(responseTime(responseMetric));



new Configuration();
new DatabaseConnection().checkConnection();




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
