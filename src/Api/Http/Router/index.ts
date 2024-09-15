import { Router } from 'express';
import { version1 } from './version1';

export const router = Router();

router.use('/api/v1', version1);