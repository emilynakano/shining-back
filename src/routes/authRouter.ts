import { Router } from "express";

import * as authController from "../controllers/authController";
import schemaMiddleware from "../middleware/schemaMiddleware";
import { createUser, loginUser } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/sign-up", schemaMiddleware(createUser), authController.signUp);
authRouter.post("/sign-in", schemaMiddleware(loginUser), authController.signIn);
authRouter.post("/refresh", authController.refreshToken);

export default authRouter;