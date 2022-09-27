import { User } from "@prisma/client";
import * as authRepository from "../repositories/authRepository";
import * as errorUtils from "../utils/errorUtil"

export type CreateUser =  Omit<User, "id">

export async function registerUser ( dataUser: CreateUser ) {
    const { email } = dataUser;

    const user = await authRepository.findUserByEmail(email);
    if(user) throw errorUtils.conflictError("email");

    await authRepository.registerUser(dataUser)
}