import { Router } from 'express';
import { resetDatabase } from '../controllers/E2EController';

const E2ERouter = Router();

E2ERouter.post('/reset', resetDatabase);

export default E2ERouter;
