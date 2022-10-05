import { Router } from 'express';
import * as noteController from '../controllers/noteController';
import tokenValidationMiddleware from '../middleware/tokenValidationMiddleware';

const noteRouter = Router();

noteRouter.use(tokenValidationMiddleware);

noteRouter.post('/', noteController.createNote);
noteRouter.get('/', noteController.getNotes);
noteRouter.get('/today', noteController.getTodayNotes);
noteRouter.patch('/:id/review', noteController.reviewNote);

export default noteRouter;
