import { Router } from "express";

import * as authController from "../controllers/authController"

const authRouter = Router();

authRouter.post("/sign-up", authController.signUp);

export default authRouter;