import { Router } from "express";
import { userRouters } from "./User.routes";

export const router = Router();

router.use('/users', userRouters);