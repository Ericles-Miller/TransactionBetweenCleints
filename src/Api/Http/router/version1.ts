import { Router } from "express";
import { userRouters } from "./User.routes";

export const version1 = Router();

version1.use('/users', userRouters);