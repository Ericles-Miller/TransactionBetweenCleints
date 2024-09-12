import { CreateTransactionController } from "@Api/Controllers/Transactions/CreateTransactionController";
import { CreateTransactionReversalController } from "@Api/Controllers/Transactions/CreateTransactionReversalController";
import { Router } from "express";


export const transactionRouters = Router();

const createTransactionController = new CreateTransactionController();
const createTransactionReversalController = new CreateTransactionReversalController();


transactionRouters.post('/', createTransactionController.handle);
transactionRouters.post('/inverse', createTransactionReversalController.handle);