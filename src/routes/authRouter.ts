import { Router } from "express";

import * as authController from "../controllers/authController"

const authRouter = Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/sign-in", authController.signIn);

export default authRouter;