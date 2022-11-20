import { Router } from 'express';

import * as authController from '../controllers/authController';
import schemaMiddleware from '../middleware/schemaMiddleware';
import tokenValidationMiddleware from '../middleware/tokenValidationMiddleware';
import { createUser, loginUser, refreshToken } from '../schemas/authSchema';

const authRouter = Router();

authRouter.post('/sign-up', schemaMiddleware(createUser), authController.signUp);
authRouter.post('/sign-in', schemaMiddleware(loginUser), authController.signIn);
authRouter.post('/refresh', schemaMiddleware(refreshToken), authController.refreshToken);
authRouter.patch('/plan/premium', tokenValidationMiddleware, authController.changeToPremiumPlan);
authRouter.patch('/plan/free', tokenValidationMiddleware, authController.changeToFreePlan);

export default authRouter;
