import { CreateTransactionController } from '@Api/Controllers/Transactions/CreateTransactionController';
import { CreateTransactionReversalController } from '@Api/Controllers/Transactions/CreateTransactionReversalController';
import { AuthorizedFlow } from '@Api/Extensions/AuthorizedFlow';
import { Limiter } from '@Api/Extensions/Limiter';
import { Router } from 'express';


export const transactionRouters = Router();

const authorizedFlow = new AuthorizedFlow();

const createTransactionController = new CreateTransactionController();
const createTransactionReversalController = new CreateTransactionReversalController();


transactionRouters.post('/', Limiter.transactionLimiter,
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  createTransactionController.handle
);

transactionRouters.post('/inverse', Limiter.transactionLimiter,
  authorizedFlow.authenticateToken,
  authorizedFlow.authorizePermission('Client.Admin'),
  createTransactionReversalController.handle
);