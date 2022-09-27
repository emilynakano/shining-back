import authRouter from "./authRouter";

import { Router } from "express";

const router = Router();

router.use(authRouter);

export default router;