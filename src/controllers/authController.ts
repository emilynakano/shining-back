import { Request, Response } from "express";

import * as authService from "../services/authService";

export async function signUp (
    req: Request, 
    res: Response
) {
    const { name, email, password } = req.body;

    await authService.registerUser({ name, email, password });

    res.status(201).send("user registred successfully!")
}

export async function signIn (
    req: Request, 
    res: Response
) {
    const { email, password } = req.body;

    const token = await authService.loginUser({ email, password });

    res.status(200).send(token);
}