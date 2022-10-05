import { Router } from 'express';
import authRouter from './authRouter';
import noteRouter from './notesRouter';

const router = Router();

router.use(authRouter);
router.use('/notes', noteRouter);

export default router;
