import { Router } from 'express';
import * as noteController from '../controllers/noteController';
import tokenValidationMiddleware from '../middleware/tokenValidationMiddleware';

import schemaMiddleware from '../middleware/schemaMiddleware';
import { createNote, updateNote } from '../schemas/noteSchema';

const noteRouter = Router();

noteRouter.use(tokenValidationMiddleware);

noteRouter.post('/', schemaMiddleware(createNote), noteController.createNote);
noteRouter.patch('/:id', schemaMiddleware(updateNote), noteController.editNote);
noteRouter.delete('/:id', noteController.deleteNote);
noteRouter.get('/', noteController.getNotes);
noteRouter.get('/today', noteController.getTodayNotes);
noteRouter.patch('/:id/review', noteController.reviewNote);

export default noteRouter;
