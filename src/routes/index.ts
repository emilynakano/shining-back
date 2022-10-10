import { Router } from 'express';
import authRouter from './authRouter';
import E2ERouter from './E2ERouter';
import noteRouter from './notesRouter';

const router = Router();

router.use(authRouter);
router.use('/notes', noteRouter);
router.use('/E2E', E2ERouter);

export default router;
