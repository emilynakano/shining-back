import { Request, Response } from "express";

import * as authService from "../services/authService";

export async function signUp (
    req: Request, 
    res: Response
) {
    const dataUser = req.body;

    await authService.registerUser(dataUser);

    res.status(201).send("user registred successfully!")
}