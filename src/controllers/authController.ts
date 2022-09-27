import { Request, Response } from "express";

import * as authService from "../services/authService";
import * as refreshTokenService from "../services/refreshTokenService"

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

    const { accessToken, refreshToken } = await authService.loginUser({ email, password });

    res.status(200).send({ accessToken, refreshToken });
}

export async function refreshToken (
    req: Request, 
    res: Response
) {
    const { refreshToken: oldRefreshToken } = req.body;

    const { accessToken, refreshToken } = await refreshTokenService.refreshSession(oldRefreshToken);

    res.status(200).send({ accessToken, refreshToken });
}