import { Router } from "express";
import { userRouters } from "./User.routes";
import { transactionRouters } from "./Transaction.routes";

export const version1 = Router();

version1.use('/users', userRouters);
version1.use('/transactions', transactionRouters)