import { User } from "@prisma/client";

import * as authRepository from "../repositories/authRepository";
import * as errorUtils from "../utils/errorUtil";
import * as refreshTokenService from "../services/refreshTokenService"

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type CreateUser =  Omit<User, "id">
export type LoginUser =  Omit<User, "id" | "name">

export async function registerUser ( dataUser: CreateUser ) {
    const { email, password } = dataUser;

    const user = await authRepository.findUserByEmail(email);
    if(user) throw errorUtils.conflictError("email");

    const hashPassword = bcrypt.hashSync(password, 10)

    await authRepository.registerUser({...dataUser, password: hashPassword});
}

export async function loginUser ( dataUser: LoginUser ) {
    const { email, password } = dataUser;

    const user = await authRepository.findUserByEmail(email);
    if(!user) throw errorUtils.unauthorizedError("credentials");

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if(!passwordIsValid) throw errorUtils.unauthorizedError("credentials");

    const accessToken = jwt.sign({ id: user.id }, (process.env.ACCESS_TOKEN_SECRET as string), { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id }, (process.env.REFRESH_TOKEN_SECRET as string), { expiresIn: '1d' });
    
    await refreshTokenService.createRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
}
