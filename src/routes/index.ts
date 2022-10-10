import { Router } from 'express';
import dotenv from 'dotenv';
import authRouter from './authRouter';
import noteRouter from './notesRouter';
import E2ERouter from './E2ERouter';

dotenv.config();

const router = Router();

router.use(authRouter);
router.use('/notes', noteRouter);

if (process.env.NODE_ENV === 'test') {
  router.use('/E2E', E2ERouter);
}

export default router;
