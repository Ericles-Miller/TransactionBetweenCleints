import { Router } from "express";
import { userRouters } from "./User.routes";
import { transactionRouters } from "./Transaction.routes";
import { authRoutes } from "./Auth.routes";

export const version1 = Router();

version1.use('/users', userRouters);
version1.use('/transactions', transactionRouters);
version1.use('/auth', authRoutes);