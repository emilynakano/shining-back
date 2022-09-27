import { Response, Request, NextFunction } from "express";

import { unauthorizedError } from "../utils/errorUtil";
import { findUserById } from "../services/authService";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function tokenValidationMiddleware(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const { authorization } = req.headers;
    if(!authorization?.startsWith("Bearer ")) throw unauthorizedError("header");

    const token = authorization.replace("Bearer ", "");
    if(!token) throw unauthorizedError("token");

    try {
        const decoded = jwt.verify(token, (process.env.ACCESS_TOKEN_SECRET as string));
        const id = (decoded as { id: number }).id
        
        const user = await findUserById(id)
        if(!user) throw unauthorizedError("token")
        
        res.locals.user = user;

        next();
    } catch (error) {
        throw unauthorizedError("token")
    }
    
}