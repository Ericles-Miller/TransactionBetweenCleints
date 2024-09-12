import { CreateTransactionController } from "@Api/Controllers/Transactions/CreateTransactionController";
import { Router } from "express";


export const transactionRouters = Router();

const createTransactionController = new CreateTransactionController();

transactionRouters.post('/', createTransactionController.handle);