import { Router } from 'express';
import * as noteController from '../controllers/noteController';

const noteRouter = Router();

noteRouter.post('/', noteController.createNote);
noteRouter.get('/', noteController.getNotes);
noteRouter.get('/today', noteController.getTodayNotes);
noteRouter.patch('/:id/review', noteController.reviewNote);

export default noteRouter;
